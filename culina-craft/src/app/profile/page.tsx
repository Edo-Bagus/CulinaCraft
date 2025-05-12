"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import RecipeCard from "@/components/card1";
import Footer from "@/components/footer";
import Copyright from "@/components/copyright";
import { IoMdAdd } from "react-icons/io";
import SearchBar from "@/components/searchbar";
import { IUser } from "@/models/Users";
import { useRouter } from "next/navigation";
import { IRecipe } from "@/models/Recipe";

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<IUser>();
  const [showPopup, setShowPopup] = useState(false);
  const [newIngredient, setNewIngredient] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const handleRemoveIngredient = async (indexToRemove: number) => {
    const nameToRemove = ingredients[indexToRemove];
  
    try {
      const res = await fetch(`/api/ingredient?name=${encodeURIComponent(nameToRemove)}`, {
        method: "DELETE",
      });
  
      if (res.ok) {
        setIngredients(prev => prev.filter((_, idx) => idx !== indexToRemove));
      } else {
        console.error("Failed to delete ingredient");
        alert("Gagal menghapus ingredient.");
      }
    } catch (error) {
      console.error("Error deleting ingredient", error);
      alert("Terjadi kesalahan saat menghapus.");
    }
  };
  
  const handleAddIngredient = async () => {
    const trimmedIngredient = newIngredient.trim();
    if (!trimmedIngredient) return;
  
    if (ingredients.includes(trimmedIngredient)) {
      alert("Ingredient already exists.");
      return;
    }
  
    try {
      const newIngredientData = {
        name: trimmedIngredient,
        unit: "pcs",
        quantity: 1,
      };
  
      const res = await fetch("/api/ingredient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newIngredientData),
      });
  
      if (res.ok) {
        setIngredients(prev => [...prev, trimmedIngredient]);
        setNewIngredient("");
        setShowPopup(false);
      } else if (res.status === 409) {
        alert("Ingredient sudah ada di database.");
      } else {
        console.error("API error");
        alert("Failed to add ingredient.");
      }
    } catch (error) {
      console.error("Failed to add ingredient", error);
      alert("Network error");
    }
  };  
  
  const [userRecipes, setUserRecipes] = useState<IRecipe[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfileAndIngredients = async () => {
      try {
        const profileRes = await fetch("/api/account");
        if (profileRes.ok) {
          const data = await profileRes.json();
          setUser(data.user);
          setUserId(data.user.id);
        }

        const ingredientsRes = await fetch("/api/ingredient");
        const ingredientsData = await ingredientsRes.json();
        const ingredientNames = ingredientsData.map((item: any) => item.name);
        setIngredients(ingredientNames);
      } catch (error) {
        console.error("Failed to fetch profile or ingredients", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndIngredients();
  }, []);

    // Fetch resep setelah userId tersedia
  useEffect(() => {
    if (!userId) return; // jangan fetch kalau userId belum ada

    const fetchUserRecipes = async () => {
      try {
        const recipesRes = await fetch(`/api/recipes?authorId=${userId}`);
        const recipesData = await recipesRes.json();
        setUserRecipes(recipesData);
      } catch (error) {
        console.error("Failed to fetch user recipes", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRecipes();
  }, [userId]);

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/logout", {
      method: "POST"
    });

    if (res.ok) {
      router.push("/login"); // arahkan ke halaman setelah login
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="p-6">
        <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-6 p-4 lg:p-6 bg-gray-50">
          {/* Sidebar */}
          <div className="w-full lg:w-1/2 bg-white p-4 lg:p-6 shadow-md rounded-lg">
            <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-6">
              {/* Left: Profile Info */}
              <div className="w-full lg:flex-1">
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 lg:w-40 lg:h-40 bg-[#E3E2E2] rounded-full" />
                  <h1 className="text-[#E7AC5F] text-lg font-semibold mt-3 lg:mt-4">
                    {user?.username || "Loading..."}
                  </h1>
                  <p className="text-xs lg:text-sm text-gray-500 text-center mt-1 lg:mt-2">
                    "Cooking my way through flavors! Exploring, creating, and sharing delicious moments one recipe at a time."
                  </p>
                  <div className="text-xs lg:text-sm text-gray-500 mt-3 lg:mt-4">
                    <p>Joined since: November 2024</p>
                  </div>
                  <div className="flex gap-3 mt-3 lg:mt-4">
                  <button
                    onClick={() => router.push("/editprofile")}
                    className="px-4 py-2 text-sm lg:text-base bg-[#85A181] text-white rounded hover:bg-blue-600 transition duration-200"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm lg:text-base bg-[#DD6840] text-white rounded hover:bg-red-600 transition duration-200"
                  >
                    Logout
                  </button>
                </div>
                </div>
              </div>

              {/* Separator Line */}
              <div className="hidden lg:block w-[2px] h-auto bg-gray-400 mx-2 lg:mx-4"></div>

              {/* Right: Stats */}
              <div className="w-full lg:flex-1 mt-4 lg:mt-0">
                <div className="flex flex-col gap-2">
                  <div className="bg-orange-100 text-orange-600 px-3 py-1 lg:px-4 lg:py-2 rounded-lg text-center text-sm lg:text-base">
                    My Recipes: <strong>5</strong>
                  </div>
                  <div className="bg-yellow-100 text-yellow-600 px-3 py-1 lg:px-4 lg:py-2 rounded-lg text-center text-sm lg:text-base">
                    Tried Recipes: <strong>10</strong>
                  </div>
                </div>

                {/* Preferences */}
                <div className="mt-4 lg:mt-6 w-full">
                  <h3 className="font-semibold text-center mb-2 lg:mb-4 text-sm lg:text-base">Preferences</h3>

                  {[
                    { title: "Western, Asian, Italian", green: "40%", yellow: "30%", lightgreen: "30%" },
                    { title: "Dessert, Snacks, Main Course", yellow: "30%", green: "40%", lightgreen: "30%" },
                    { title: "Grilled, Fried, Steamed", lightgreen: "50%", green: "30%", yellow: "20%" },
                  ].map((pref, index) => (
                    <div className="mb-3 lg:mb-4" key={index}>
                      <h4 className="text-xs lg:text-sm font-medium">{pref.title}</h4>
                      <div className="w-full bg-gray-200 rounded-full h-3 lg:h-4 mt-1 lg:mt-2 flex">
                        {pref.green && <div className="bg-green-600 h-3 lg:h-4 rounded-l-full" style={{ width: pref.green }} />}
                        {pref.yellow && <div className="bg-yellow-400 h-3 lg:h-4" style={{ width: pref.yellow }} />}
                        {pref.lightgreen && <div className="bg-green-400 h-3 lg:h-4 rounded-r-full" style={{ width: pref.lightgreen }} />}
                      </div>
                    </div>
                  ))}

                  <p className="text-xs lg:text-sm text-gray-500">Allergy: Peanuts, Beans</p>
                </div>
              </div>
            </div>
          </div>

          {/* Refrigerator Section */}
          <div className="w-full lg:w-1/2 bg-[#E3E2E2] rounded-lg shadow-md p-4 lg:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <h3 className="text-base lg:text-lg font-medium text-gray-800">My Refrigerator</h3>
              <button
                onClick={() => setShowPopup(true)}
                className="flex items-center bg-white text-black px-3 py-1.5 lg:px-4 lg:py-2 rounded-full mt-2 sm:mt-0 text-sm lg:text-base"
              >
                <IoMdAdd size={18} className="mr-1 lg:mr-2 text-[#B6DEB0]" /> Add Ingredient
              </button>
            </div>

            {/* Ingredients List */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4 mt-4 lg:mt-6 overflow-y-auto max-h-64 lg:max-h-72 scrollbar-hide">
              {loading ? (
                <p className="col-span-full text-center">Loading ingredients...</p>
              ) : ingredients.length === 0 ? (
                <p className="col-span-full text-center">No ingredients found.</p>
              ) : (
                ingredients.map((item, index) => (
                  <div
                    key={index}
                    className="relative text-center text-sm p-3 bg-white rounded-md shadow-md hover:shadow-lg transition-shadow duration-200 min-w-[100px]"
                  >
                    <button
                      onClick={() => handleRemoveIngredient(index)}
                      className="absolute top-1 right-1 text-xs text-gray-500 hover:text-red-600"
                      title="Remove"
                    >
                      ✕
                    </button>
                    {item}
                  </div>
                ))
                
              )}
            </div>

            <div className="flex justify-start mt-4 lg:mt-6">
              <button className="flex items-center bg-[#DD6840] text-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-sm lg:text-base">
                <IoMdAdd size={18} className="mr-1 text-[#B6DEB0]" /> Cook Now
              </button>
            </div>
          </div>
        </div>

        {/* Favorite Recipes */}
        <section className="mt-6">
          <h3 className="text-lg font-medium text-gray-800">Favorite Recipes</h3>
          <div className="flex justify-start space-x-8 py-4 overflow-x-auto w-full scrollbar-hide">
            {Array(10).fill(null).map((_, index) => (
              <div key={index} className="min-w-[280px] max-w-[300px] flex-shrink-0">
                <RecipeCard
                  title="Ayam Penyet Surabaya Makassar Solo Pekanbaru Jakarta"
                  calories="300 cal"
                  rating={4.5}
                  imageUrl="/resep1.jpg"
                />
              </div>
            ))}
          </div>
        </section>

        {/* My Recipes */}
        <section className="mt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-800">My Recipes</h3>
            <button 
              className="flex items-center bg-[#DD6840] text-white px-3 py-1 rounded-full mt-2"
              onClick={() => router.push("/uploadrecipe")}
            >
              <IoMdAdd size={20} className="mr-1 text-[#B6DEB0]" /> Upload More Recipes
            </button>
          </div>
          <div className="flex justify-start space-x-8 py-4 overflow-x-auto w-full scrollbar-hide">
          {loading ? (
              <p>Loading...</p>
            ) : (
              userRecipes.map((recipe) => (
                <div key={String(recipe._id)} className="min-w-[280px] max-w-[300px] flex-shrink-0">
                  <RecipeCard
                    id={String(recipe._id)}
                    title={recipe.name}
                    calories={`${recipe.calories} cal`}
                    rating={recipe.rating}
                    imageUrl="/resep1.jpg"
                  />
                </div>
              ))
            )}
          </div>
        </section>
      </main>
          {showPopup && (
      <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
        <div className="bg-[#E3E2E2] p-6 rounded-lg shadow-lg w-11/12 max-w-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Ingredient</h2>
          <input
            type="text"
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            placeholder="Ingredient name"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#85A181] mb-4"
          />
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowPopup(false)}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleAddIngredient}
              className="bg-[#85A181] text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    )}
      <Footer />
      <Copyright />
    </div>
  );
};

export default ProfilePage;