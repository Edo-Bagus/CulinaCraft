"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import RecipeCard from "@/components/card1";
import Footer from "@/components/footer";
import Copyright from "@/components/copyright";
import CardBahan from "@/components/cardbahan";
import SearchBar from "@/components/searchbar";

export default function Home() {
  const [ingredients, setIngredients] = useState<{ _id: string; name: string }[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loadingIngredients, setLoadingIngredients] = useState(true);
  const [loadingRecipes, setLoadingRecipes] = useState(false);

  // Fetch daftar semua bahan
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const res = await fetch("/api/ingredient");
        const data = await res.json();
        setIngredients(data);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      } finally {
        setLoadingIngredients(false);
      }
    };
    fetchIngredients();
  }, []);

  // Fetch resep berdasarkan filter
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoadingRecipes(true);
      try {
        const params = new URLSearchParams();

        if (searchQuery) params.set("q", searchQuery);
        selectedIngredients.forEach((ingredient) => params.append("ingredients", ingredient));

        const res = await fetch(`/api/recipes?${params.toString()}`);
        const data = await res.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoadingRecipes(false);
      }
    };

    fetchRecipes();
  }, [searchQuery, selectedIngredients]);

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const clearAllIngredients = () => {
    setSelectedIngredients([]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="text-center mt-6">
        <h1 className="text-2xl font-bold text-orange-500">Pick and Cook</h1>
        <p className="text-gray-600">Quickly check what you have and plan your next meal!</p>
      </div>

      <main className="flex flex-col md:flex-row flex-grow px-6 md:px-12 py-6 gap-8">
        {/* Sidebar Bahan */}
        <aside className="w-full md:w-[510px] bg-[#F7D197] p-4 rounded-lg flex flex-col h-[400px]">
          <div className="mb-4">
            <SearchBar
              placeholder="What ingredients you have?"
              className="md:w-[480px]"
              onChange={(e: any) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />
          </div>

          <div className="overflow-y-auto flex-grow space-y-3 pr-3 scrollbar-hide">
            {loadingIngredients ? (
              <p>Loading ingredients...</p>
            ) : ingredients.length === 0 ? (
              <p>No ingredients found.</p>
            ) : (
              ingredients.map((ingredient) => (
                <div
                  key={ingredient._id}
                  onClick={() => toggleIngredient(ingredient.name)}
                >
                  <CardBahan
                    imageUrl="/bahanayam.jpg"
                    title={ingredient.name}
                    selected={selectedIngredients.includes(ingredient.name)}
                  />
                </div>
              ))
            )}
          </div>
        </aside>

        {/* Konten utama */}
        <section className="flex-1">
          <div className="flex items-center justify-start gap-4 my-4 flex-wrap">
            {selectedIngredients.map((ingredient) => (
              <div
                key={ingredient}
                className="flex items-center bg-white border border-black px-3 py-1 rounded-full text-black 
                  hover:border-[#e7ac5f] hover:bg-[#f4e8b4] transition duration-200 ease-in-out"
              >
                <span className="text-sm">{ingredient}</span>
                <button
                  className="ml-2 text-[#b6deb0] hover:text-[#dd6840]"
                  onClick={() => toggleIngredient(ingredient)}
                >
                  ✖
                </button>
              </div>
            ))}
            {selectedIngredients.length > 0 && (
              <button
                className="text-[#dd6840] border border-[#dd6840] px-3 py-1 rounded-full text-sm 
                  hover:bg-[#e7ac5f] hover:text-white transition duration-200 ease-in-out"
                onClick={clearAllIngredients}
              >
                Clear All
              </button>
            )}
          </div>

          {/* Grid Resep */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {loadingRecipes ? (
              <p>Loading recipes...</p>
            ) : recipes.length === 0 ? (
              <p>No recipes found.</p>
            ) : (
              recipes.map((recipe) => (
                <RecipeCard
                  key={recipe._id}
                  id={String(recipe._id)}
                  title={recipe.name}
                  calories={`${recipe.calories || "?"} cal`}
                  rating={recipe.rating || 0}
                  imageUrl={recipe.image || "/resep1.jpg"}
                />
              ))
            )}
          </div>
        </section>
      </main>

      <Footer />
      <Copyright />
    </div>
  );
}
