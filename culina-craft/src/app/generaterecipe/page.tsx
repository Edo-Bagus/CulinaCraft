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
      setRecipe(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
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
            <h2 className="text-2xl font-semibold mb-2">{recipe.recipe_name}</h2>
            <h3 className="font-semibold">Ingredients:</h3>
            <ul className="list-disc list-inside mb-4">
              {recipe.ingredients.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <h3 className="font-semibold">Instructions:</h3>
            <p>{recipe.instructions}</p>
          </div>
        )}
      </main>
      <Footer />
      <Copyright />
    </div>
  );
}
