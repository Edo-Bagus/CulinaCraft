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

    if (id) fetchRecipe();
  }, [id]);

  const handleRating = (rating: number) => {
    setUserRating(rating);
    // TODO: Save rating to backend if needed
  };

  const toggleLike = () => {
    setLiked(prev => !prev);
    // TODO: Save like to backend if needed
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
        <div className="w-3/4 bg-[#B6DEB0] p-6 rounded-2xl m-6 mx-auto flex items-center">
          <img
            src="/nasi-goreng.jpg"
            alt="Nasi Goreng"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg mr-6 object-cover"
          />
          <div>
            <h1 className="text-lg sm:text-2xl text-[#F4E8B4] font-bold">{recipe.name}</h1>
            <p className="text-gray-700 flex items-center gap-2 text-sm sm:text-base">
              <span>{recipe.calories}</span> | <span className="text-yellow-600">⭐ {recipe.rating}</span>
            </p>

            {/* Rating and Like Section */}
            <div className="flex items-center gap-4 mt-2">
              {/* Star Rating */}
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => handleRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="cursor-pointer text-yellow-500 text-xl"
                  >
                    {star <= (hoverRating || userRating) ? <FaStar /> : <FaRegStar />}
                  </span>
                ))}
              </div>

              {/* Like Button */}
              <button onClick={toggleLike} className="text-red-500 text-xl focus:outline-none">
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
            This dish contains approximately <span className="font-semibold text-[#85A181]">450 calories</span>, 
            with <span className="font-semibold text-[#85A181]">20g of protein</span>, 
            <span className="font-semibold text-[#85A181]"> 15g of fat</span>, and 
            <span className="font-semibold text-[#85A181]"> 50g of carbohydrates</span>.
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
