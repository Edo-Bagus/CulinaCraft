"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Copyright from "@/components/copyright";
import { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { useSearchParams } from "next/navigation";

export default function GenerateRecipePage() {
  const searchParams = useSearchParams();
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([""]);
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const ingredientsParam = searchParams.get("ingredients");
    if (ingredientsParam) {
      const ingredientsFromQuery = ingredientsParam
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
      if (ingredientsFromQuery.length > 0) {
        setSelectedIngredients(ingredientsFromQuery);
      }
    }
  }, [searchParams]);

  const handleIngredientChange = (index: number, value: string) => {
    const updated = [...selectedIngredients];
    updated[index] = value;
    setSelectedIngredients(updated);
  };

  const addIngredient = () => setSelectedIngredients([...selectedIngredients, ""]);

  const removeIngredient = (index: number) => {
    setSelectedIngredients(selectedIngredients.filter((_, i) => i !== index));
  };

  const handleGenerate = async () => {
    const cleanedIngredients = selectedIngredients
      .map((item) => item.trim())
      .filter((item) => item.length > 0)
      .join(", ");

    if (!cleanedIngredients) {
      setError("Please enter at least one ingredient.");
      return;
    }

    setLoading(true);
    setError("");
    setRecipe(null);

    try {
      const response = await fetch("https://culinacraft-lr06.onrender.com/generate-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: cleanedIngredients }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate recipe.");
      }

      const data = await response.json();
      setRecipe(data); // pastikan ini object, bukan string
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (recipeName: string, ingredients: string[], steps: string[], calories: number, sugar: number, protein: number, carbohydrates: number) => {
    const payload = {
      name: recipeName,
      ingredients: ingredients,
      steps: steps,
      calories: calories,
      sugar: sugar,
      protein: protein,
      carbohydrates: carbohydrates

    };
    console.log(payload)
  
    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) {
        throw new Error("Failed to upload recipe");
      }
  
      const data = await res.json();
      console.log("Recipe uploaded:", data);
      alert("Recipe uploaded successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to upload recipe");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center px-4 py-10">
        <h1 className="text-[35px] font-semibold">Generate Recipe</h1>
        <p className="text-[#E7AC5F] mt-2 text-center">
          Prepare your ingredients and get a personalized recipe instantly.
        </p>

        <div className="bg-[#85A181] text-white p-6 rounded-2xl w-full max-w-5xl mt-6">
          <div className="mb-4">
            <label className="block text-lg mb-1">Your Ingredients</label>
            {selectedIngredients.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <span className="bg-[#E7AC5F] px-3 py-1 rounded-full">{index + 1}</span>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                  placeholder="ex: 2 pcs egg"
                  className="w-full p-2 text-black rounded-md"
                />
                <button onClick={() => removeIngredient(index)} className="text-[#B6DEB0]">
                  <FaRegTrashAlt size={20} />
                </button>
              </div>
            ))}
            <button
              onClick={addIngredient}
              className="flex items-center bg-[#DD6840] px-3 py-1 rounded-full mt-2"
            >
              <IoMdAdd size={20} className="mr-1 text-[#B6DEB0]" /> Add Ingredient
            </button>
          </div>

          <div className="flex justify-end mt-6 gap-4">
            <button
              onClick={handleGenerate}
              className="bg-[#DD6840] text-white px-4 py-2 rounded-md"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Recipe"}
            </button>
          </div>
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {recipe && (
          <div className="bg-white text-black p-6 rounded-2xl w-full max-w-5xl mt-8 shadow-md">
            <h2 className="text-2xl font-semibold mb-2">{recipe.title}</h2>

            <h3 className="font-semibold">Ingredients:</h3>
            <ul className="list-disc list-inside mb-4">
              {(recipe.ingredients || []).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h3 className="font-semibold">Instructions:</h3>
            <ol className="list-decimal list-inside space-y-1">
              {(recipe.instructions || []).map((step: string, index: number) => (
                <li key={index}>{step}</li>
              ))}
            </ol>

            <h3 className="font-semibold mb-2">Nutrition:</h3>
            <ul className="list-disc list-inside mb-4 text-gray-700">
              <li><strong>Calories:</strong> {recipe.calories} kcal</li>
              <li><strong>Carbohydrates:</strong> {recipe.carbohydrates} g</li>
              <li><strong>Protein:</strong> {recipe.protein} g</li>
              <li><strong>Sugar:</strong> {recipe.sugar} g</li>
            </ul>

            <div className="flex justify-end mt-6 gap-4">
            <button 
              className="bg-[#DD6840] text-white px-4 py-2 rounded-md"
              onClick={() => handleSubmit(recipe.title, recipe.ingredients, recipe.instructions, recipe.calories, recipe.sugar, recipe.protein, recipe.carbohydrates)}
            >
              Submit Recipe
            </button>
          </div>
          </div>
          
        )}


      </main>
      <Footer />
      <Copyright />
    </div>
  );
}
