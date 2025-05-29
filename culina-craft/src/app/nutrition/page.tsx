"use client";

import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Copyright from "@/components/copyright";
import RecipeCard from "@/components/card1";

export default function NutrisiPage() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [minCaloriesInput, setMinCaloriesInput] = useState("0");
  const [maxCaloriesInput, setMaxCaloriesInput] = useState("1000");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  // Build query params for API call based on filters
  const buildQueryParams = () => {
    const params = new URLSearchParams();

    // Sort by calories
    params.append("sortBy", "calories");
    params.append("order", sortOrder);

    // Use a large limit or adjust as needed
    params.append("limit", "100");

    // We'll fetch all and filter on client side for nutrients other than calories
    return params.toString();
  };

  // Fetch recipes from API whenever sortOrder changes
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        const query = buildQueryParams();
        const res = await fetch(`/api/recipes?${query}`);
        if (!res.ok) throw new Error("Failed to fetch recipes");
        const data = await res.json();
        setRecipes(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [sortOrder]);

  // Filter recipes by nutrition values client-side (protein, sugar, carbs, calories range)
  const filteredRecipes = useMemo(() => {
    const minCalories = parseInt(minCaloriesInput) || 0;
    const maxCalories = parseInt(maxCaloriesInput) || 10000;

    return recipes
      .filter((r) => r.calories >= minCalories && r.calories <= maxCalories)
      .filter((r) => {
        return selectedFilters.every((filter) => {
          if (filter === "highProtein") return r.protein >= 20;
          if (filter === "lowSugar") return r.sugar <= 5;
          if (filter === "highCarbs") return r.carbohydrates >= 40;
          return true;
        });
      });
  }, [recipes, minCaloriesInput, maxCaloriesInput, selectedFilters]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="text-center mt-6">
        <h1 className="text-3xl font-extrabold text-orange-500 mb-1">Nutritional Explorer</h1>
        <p className="text-gray-600 text-sm md:text-base">
          Filter and sort recipes based on calories and nutrients
        </p>
      </div>

      <main className="flex flex-col md:flex-row flex-grow px-6 md:px-12 py-6 gap-8">
        <aside className="w-full md:w-fit bg-[#F7D197] p-6 rounded-lg flex flex-col h-fit min-w-[280px]">
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">Sort by Calories</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="asc">Lowest First</option>
              <option value="desc">Highest First</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">Calories Range</label>
            <div className="flex gap-4">
              <input
                type="number"
                min={0}
                value={minCaloriesInput}
                onChange={(e) => setMinCaloriesInput(e.target.value)}
                className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Min"
              />
              <input
                type="number"
                min={0}
                value={maxCaloriesInput}
                onChange={(e) => setMaxCaloriesInput(e.target.value)}
                className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Max"
              />
            </div>
          </div>

          <div>
            <label className="block mb-3 font-semibold text-gray-700">Optional Nutrient Filters</label>
            <div className="flex flex-wrap gap-3">
              {[
                { key: "highProtein", label: "High Protein" },
                { key: "lowSugar", label: "Low Sugar" },
                { key: "highCarbs", label: "High Carbohydrate" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => toggleFilter(key)}
                  className={`px-5 py-2 rounded-full border-2 font-medium text-sm transition-colors duration-200
                    ${
                      selectedFilters.includes(key)
                        ? "bg-orange-400 border-orange-600 text-white"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-orange-100"
                    }
                  `}
                  style={{ minWidth: 120 }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <section className="flex-1 flex flex-col">
          <div className="flex flex-wrap gap-3 mb-4">
            {selectedFilters.map((filter) => (
              <div
                key={filter}
                className="flex items-center bg-orange-100 border border-orange-400 px-4 py-1 rounded-full text-sm font-semibold text-orange-700"
              >
                <span>
                  {filter === "highProtein"
                    ? "High Protein"
                    : filter === "lowSugar"
                    ? "Low Sugar"
                    : "High Carbohydrate"}
                </span>
                <button
                  className="ml-2 text-orange-500 hover:text-orange-700 font-bold"
                  onClick={() => toggleFilter(filter)}
                >
                  ✕
                </button>
              </div>
            ))}

            {(selectedFilters.length > 0 || minCaloriesInput !== "0" || maxCaloriesInput !== "1000") && (
              <button
                className="text-orange-600 border border-orange-600 px-4 py-1 rounded-full text-sm font-semibold hover:bg-orange-600 hover:text-white transition-colors"
                onClick={() => {
                  setSelectedFilters([]);
                  setMinCaloriesInput("0");
                  setMaxCaloriesInput("1000");
                }}
              >
                Clear All Filters
              </button>
            )}
          </div>

          <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg flex flex-wrap items-center justify-between text-orange-700 font-semibold text-sm md:text-base">
            <div>
              Calories:{" "}
              <span className="font-bold">
                {minCaloriesInput || 0} - {maxCaloriesInput || 0} cal
              </span>
            </div>
            <div>
              Sorted by calories:{" "}
              <span className="font-bold">{sortOrder === "asc" ? "Lowest First" : "Highest First"}</span>
            </div>
          </div>

          {/* Loading & Error handling */}
          {loading && <p>Loading recipes...</p>}
          {error && <p className="text-red-500">{error}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 flex-grow overflow-auto">
            {filteredRecipes.length === 0 && !loading ? (
              <p className="text-center text-gray-500 col-span-full">
                No recipes match the selected filters.
              </p>
            ) : (
              filteredRecipes.map((recipe, index) => (
                <RecipeCard
                  key={index}
                  id={String(recipe._id)}
                  title={recipe.name}
                  calories={`${recipe.calories} cal`}
                  rating={recipe.rating}
                  imageUrl={recipe.imageUrl || "/resep1.jpg"} // fallback image
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
