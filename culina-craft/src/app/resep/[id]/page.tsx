"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Copyright from "@/components/copyright";
import { useParams } from "next/navigation";
import { FaStar, FaRegStar, FaHeart, FaRegHeart } from "react-icons/fa";

const RecipePage: React.FC = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = React.useState<any>(null);
  const [loading, setLoading] = useState(true);

  // State for user interaction
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
  const fetchRecipe = async () => {
    try {
      const res = await fetch(`/api/recipes/${id}`);
      const data = await res.json();
      setRecipe(data);
    } catch (err) {
      console.error("Failed to fetch recipe:", err);
    } finally {
      setLoading(false);
    }
  };

  const checkIfLiked = async () => {
    try {
      const res = await fetch("/api/account/favorites");
      const data = await res.json();

      if (data.favorites?.some((fav: any) => fav._id === id)) {
        setLiked(true);
      }
    } catch (err) {
      console.error("Failed to check favorites:", err);
    }
  };

  if (id) {
    fetchRecipe();
    checkIfLiked();
  }
}, [id]);


  const handleRating = (rating: number) => {
    setUserRating(rating);
    // TODO: Save rating to backend if needed
  };

 const toggleLike = async () => {
  try {
    const method = liked ? "DELETE" : "POST";
    const res = await fetch("/api/account/favorites", {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipeId: id }),
    });

    if (res.ok) {
      setLiked(!liked);
    } else {
      console.error("Failed to update favorite:", await res.json());
    }
  } catch (err) {
    console.error("Error toggling favorite:", err);
  }
};


  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!recipe) {
    return <div className="text-center mt-10 text-red-500">Recipe not found.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F9F9] font-sans">
      <Navbar />

      {/* Content Wrapper */}
      <main className="flex-grow">
        {/* Recipe Header */}
        <div className="w-3/4 bg-[#B6DEB0] p-6 rounded-2xl m-6 mx-auto flex items-center gap-6">
          <img
            src="/resep1.jpg"
            alt="Nasi Goreng"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg object-cover flex-shrink-0"
          />
          <div className="flex flex-col justify-center flex-grow">
            <h1 className="text-lg sm:text-2xl text-[#F4E8B4] font-bold mb-1">{recipe.name}</h1>
            <p className="text-gray-700 flex items-center gap-3 text-sm sm:text-base font-medium">
              <span>{recipe.calories} kcal</span>
            </p>

            {/* Rating and Like Section */}
            <div className="flex items-center gap-4 mt-3">
              {/* Like Button */}
              <button 
                onClick={toggleLike} 
                className="text-red-500 text-2xl focus:outline-none hover:scale-110 transition-transform duration-200"
                aria-label={liked ? "Unlike recipe" : "Like recipe"}
              >
                {liked ? <FaHeart /> : <FaRegHeart />}
              </button>
            </div>
          </div>
        </div>


        {/* Ingredients and Steps */}
        <section className="flex flex-wrap justify-center px-6 gap-6 mb-10">
          <div className="bg-[#FFF3C4] p-6 rounded-lg w-full sm:w-1/3 relative">
            <h2 className="text-xl text-[#85A181] font-semibold bg-[#FFF3C4] px-4 py-2 rounded-t-lg absolute -top-4 left-6">
              Ingredients
            </h2>
            <ol className="mt-6 text-[#85A181] text-sm sm:text-base list-none space-y-1">
              {recipe.ingredients.map((item: string, idx: number) => (
                <li key={idx}>
                  {idx + 1}. {item}
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-[#FFF3C4] p-6 rounded-lg w-full sm:w-1/3 relative">
            <h2 className="text-xl text-[#85A181] font-semibold bg-[#FFF3C4] px-4 py-2 rounded-t-lg absolute -top-4 left-6">
              Steps
            </h2>
            <ol className="mt-6 text-[#85A181] text-sm sm:text-base list-none space-y-1">
              {recipe.steps.map((item: string, idx: number) => (
                <li key={idx}>
                  {idx + 1}. {item}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Nutrition Info Section */}
        <section className="w-3/4 mx-auto bg-white p-6 rounded-lg shadow-md mb-10">
          <h2 className="text-xl font-semibold text-[#85A181] mb-4">Nutrition Information</h2>
          <p className="text-gray-700 text-sm sm:text-base"> 
            This dish contains approximately <span className="font-semibold text-[#85A181]">{recipe.calories} calories</span>, 
            with <span className="font-semibold text-[#85A181]">{recipe.protein}g of protein</span>, 
            <span className="font-semibold text-[#85A181]"> {recipe.carbohydrates}g of carbohydrates</span>,
            <span className="font-semibold text-[#85A181]"> and {recipe.sugar}g of sugar</span>.
          </p>
        </section>
      </main>

      {/* Footer */}
      <Footer />
      <Copyright />
    </div>
  );
};

export default RecipePage;
