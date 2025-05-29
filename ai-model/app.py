from fastapi import FastAPI, Request
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import requests

# Load API key
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Load dataset
df = pd.read_csv("recipes_sample.csv")

# Preprocess recipe names
vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = vectorizer.fit_transform(df['ingredients'])

# Setup FastAPI
app = FastAPI()

# Input model
class IngredientInput(BaseModel):
    ingredients: str  # e.g., "egg, flour, sugar"

@app.post("/generate-recipe")
def generate_recipe(input: IngredientInput):
    query = input.ingredients

    # Find similar recipes
    query_vec = vectorizer.transform([query])
    similarity_scores = cosine_similarity(query_vec, tfidf_matrix)
    top_indices = similarity_scores.argsort()[0][-5:][::-1]
    retrieved_context = "\n\n".join(
        f"Title: {df.iloc[i]['title']}\n"
        f"Ingredients: {df.iloc[i]['ingredients']}\n"
        f"Instructions: {df.iloc[i]['directions']}"
        for i in top_indices
    )


    # Build prompt
    prompt = f"""
You are a helpful recipe generator.

Available ingredients: {query}

Based on the following related recipes:
{retrieved_context}

Create a new recipe using the available ingredients. Include clear quantity and unit for each ingredient (e.g., "2 cups flour", "1 tsp sugar").

Return only the result in JSON format, like this:

{{
  "title": "...",
  "ingredients": ["2 cups flour", "1 tsp sugar", "..."],
  "instructions": ["Step 1...", "Step 2...", "..."]
}}

Do not include any explanation — only return the JSON object.
"""


    # Call Groq API
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
            "max_tokens": 800,
            "presence_penalty": 0.3,
            "frequency_penalty": 0.3
        }
    )


    if response.status_code != 200:
        return {"error": response.json()}

    result = response.json()["choices"][0]["message"]["content"]
    return result
