from fastapi import FastAPI, Request
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import requests
from fastapi.middleware.cors import CORSMiddleware

import logging

# Konfigurasi logging dasar
logging.basicConfig(level=logging.INFO)  # atau DEBUG untuk detail lebih lengkap
logger = logging.getLogger(__name__)



# Load API key
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Load dataset
df = pd.read_csv("recipes_sample.csv")
nutrition_df = pd.read_csv("nndb_flat.csv")

# Preprocess recipe names
vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = vectorizer.fit_transform(df['ingredients'])

food_descriptions = nutrition_df['Descrip'].dropna().str.lower().tolist()
food_vectorizer = TfidfVectorizer(stop_words='english')
food_tfidf_matrix = food_vectorizer.fit_transform(food_descriptions)

# Setup FastAPI
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Input model
class IngredientInput(BaseModel):
    ingredients: str  # e.g., "egg, flour, sugar"

import json
import re

# Normalisasi nama bahan dari input resep
def normalize_ingredient(ingredient):
    # Contoh: "2 cups flour" -> "flour"
    cleaned = re.sub(r"^[\d\.\-/]+(?:\s+\w+)?\s+", "", ingredient.lower())
    return cleaned.split(",")[0].strip()

def estimate_nutrition_cosine(ingredients_str):
    # Split ingredients by comma atau bisa sesuaikan
    ingredients_list = [i.strip() for i in ingredients_str.split(",") if i.strip()]
    total = {
        "calories": 0.0,
        "carbohydrates": 0.0,
        "protein": 0.0,
        "sugar": 0.0
    }
    for item in ingredients_list:
        normalized = normalize_ingredient(item)
        item_vec = food_vectorizer.transform([normalized])
        similarities = cosine_similarity(item_vec, food_tfidf_matrix)
        best_match_idx = similarities.argmax()
        score = similarities[0, best_match_idx]

        if score > 0.2:
            food = nutrition_df.iloc[best_match_idx]
            total["calories"] += food.get("Energy_kcal", 0) or 0
            total["carbohydrates"] += food.get("Carbohydrt_g", 0) or 0
            total["protein"] += food.get("Protein_g", 0) or 0
            total["sugar"] += food.get("Sugars_g", 0) or 0
    # Format angka misal 2 desimal
    for k in total:
        total[k] = round(total[k], 2)
    return total

@app.post("/generate-recipe")
def generate_recipe(input: IngredientInput):
    query = input.ingredients
    # Retrieve resep terkait pakai TF-IDF
    query_vec = vectorizer.transform([query])
    similarity_scores = cosine_similarity(query_vec, tfidf_matrix)
    top_indices = similarity_scores.argsort()[0][-5:][::-1]
    
    retrieved_context = "\n\n".join(
        f"Title: {df.iloc[i]['title']}\n"
        f"Ingredients: {df.iloc[i]['ingredients']}\n"
        f"Instructions: {df.iloc[i]['directions']}"
        for i in top_indices
    )
    
    # Estimasi nutrisi kasar via cosine similarity
    nutrition_estimate = estimate_nutrition_cosine(query)
    
    prompt = f"""
You are a helpful recipe generator.

Available ingredients: {query}

Based on the following related recipes:
{retrieved_context}

Preliminary estimated nutrition from available ingredients (approximate):
- Calories: {nutrition_estimate['calories']}
- Carbohydrates: {nutrition_estimate['carbohydrates']} g
- Protein: {nutrition_estimate['protein']} g
- Sugar: {nutrition_estimate['sugar']} g

Using this information, create a new recipe using the available ingredients. Include clear quantity and unit for each ingredient (e.g., "2 cups flour", "1 tsp sugar").

Also estimate nutrition info for the entire recipe, including:
- calories
- carbohydrates
- protein
- sugar

Return only the result in JSON format, like this:

{{
  "title": "...",
  "ingredients": ["2 cups flour", "1 tsp sugar", "..."],
  "instructions": ["Step 1...", "Step 2...", "..."],
  "calories": 123,
  "carbohydrates": 45,
  "protein": 10,
  "sugar": 5
}}

Do not include any explanation — only return the JSON object.
"""

    response = requests.post(
        "https://api.groq.com/openai/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "model": "llama-3.3-70b-versatile",
            "messages": [
                {"role": "system", "content": "You are a helpful recipe generator that outputs JSON."},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.6,
            "max_tokens": 800
        }
    )

    if response.status_code != 200:
        return {"error": response.json()}
    
    content = response.json()["choices"][0]["message"]["content"]
    clean_content = content.strip().strip("```").strip()

    try:
        result_json = json.loads(clean_content)
    except json.JSONDecodeError:
        return {"error": "Invalid JSON generated by model."}

    return result_json

@app.post("/estimate-nutrition")
def estimate_nutrition_rag(input: IngredientInput):
    query = input.ingredients
    
    # Retrieve konteks bahan dan resep terkait (opsional untuk bantu LLM)
    query_vec = vectorizer.transform([query])
    similarity_scores = cosine_similarity(query_vec, tfidf_matrix)
    top_indices = similarity_scores.argsort()[0][-5:][::-1]
    
    retrieved_context = "\n\n".join(
        f"Title: {df.iloc[i]['title']}\n"
        f"Ingredients: {df.iloc[i]['ingredients']}\n"
        f"Instructions: {df.iloc[i]['directions']}"
        for i in top_indices
    )
    
    # Estimasi awal dari cosine similarity
    nutrition_estimate = estimate_nutrition_cosine(query)

    prompt = f"""
You are a nutrition estimation assistant.

The user provided these ingredients:
{query}

Based on related recipes:
{retrieved_context}

And based on approximate ingredient-based similarity, the preliminary nutrition estimate is:
- Calories: {nutrition_estimate['calories']}
- Carbohydrates: {nutrition_estimate['carbohydrates']} g
- Protein: {nutrition_estimate['protein']} g
- Sugar: {nutrition_estimate['sugar']} g

Refine this estimate and return **only** the result in JSON format like this:

{{
  "calories": 123,
  "carbohydrates": 45,
  "protein": 10,
  "sugar": 5
}}

Do not include any explanation or text, only return the JSON.
"""

    response = requests.post(
        "https://api.groq.com/openai/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "model": "llama-3.3-70b-versatile",
            "messages": [
                {"role": "system", "content": "You are a helpful nutrition assistant that outputs JSON."},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.4,
            "max_tokens": 400
        }
    )

    if response.status_code != 200:
        return {"error": response.json()}
    
    content = response.json()["choices"][0]["message"]["content"]
    clean_content = content.strip().strip("```").strip()

    try:
        result_json = json.loads(clean_content)
    except json.JSONDecodeError:
        return {"error": "Invalid JSON generated by model."}

    return result_json


