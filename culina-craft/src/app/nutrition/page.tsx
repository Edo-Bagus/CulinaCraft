"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Copyright from "@/components/copyright";
import RecipeCard from "@/components/card1";
import SearchBar from "@/components/searchbar";

const dummyRecipes = [
  {
    title: "Ayam Penyet Surabaya",
    calories: 300,
    protein: 25,
    carbs: 40,
    sugar: 5,
    rating: 4.5,
    imageUrl: "/resep1.jpg",
  },
  {
    title: "Salad Sayur Sehat",
    calories: 150,
    protein: 10,
    carbs: 15,
    sugar: 2,
    rating: 4.2,
    imageUrl: "/resep1.jpg",
  },
  {
    title: "Nasi Goreng Ayam",
    calories: 550,
    protein: 20,
    carbs: 60,
    sugar: 7,
    rating: 4.8,
    imageUrl: "/resep1.jpg",
  },
  {
    title: "Smoothie Buah",
    calories: 200,
    protein: 5,
    carbs: 35,
    sugar: 18,
    rating: 4.3,
    imageUrl: "/resep1.jpg",
  },
  {
    title: "Oatmeal Tinggi Protein",
    calories: 400,
    protein: 30,
    carbs: 35,
    sugar: 6,
    rating: 4.6,
    imageUrl: "/resep1.jpg",
  },
  {
    title: "Pasta Rendah Gula",
    calories: 450,
    protein: 15,
    carbs: 50,
    sugar: 3,
    rating: 4.4,
    imageUrl: "/resep1.jpg",
  },
];

export default function NutrisiPage() {
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

  const filteredRecipes = useMemo(() => {
    const minCalories = parseInt(minCaloriesInput) || 0;
    const maxCalories = parseInt(maxCaloriesInput) || 10000;

    return [...dummyRecipes]
      .filter((r) => r.calories >= minCalories && r.calories <= maxCalories)
      .filter((r) => {
        return selectedFilters.every((filter) => {
          if (filter === "highProtein") return r.protein >= 20;
          if (filter === "lowSugar") return r.sugar <= 5;
          if (filter === "highCarbs") return r.carbs >= 40;
          return true;
        });
      })
      .sort((a, b) =>
        sortOrder === "asc" ? a.calories - b.calories : b.calories - a.calories
      );
  }, [minCaloriesInput, maxCaloriesInput, selectedFilters, sortOrder]);

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
        {/* Sidebar Filter */}
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

        {/* Main Content */}
        <section className="flex-1 flex flex-col">
          {/* Filter Tags */}
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

          {/* Visual Filter Summary */}
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

          {/* Grid Resep */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 flex-grow overflow-auto">
            {filteredRecipes.length === 0 ? (
              <p className="text-center text-gray-500 col-span-full">
                No recipes match the selected filters.
              </p>
            ) : (
              filteredRecipes.map((recipe, index) => (
                <RecipeCard
                  key={index}
                  title={recipe.title}
                  calories={`${recipe.calories} cal`}
                  rating={recipe.rating}
                  imageUrl={recipe.imageUrl}
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
