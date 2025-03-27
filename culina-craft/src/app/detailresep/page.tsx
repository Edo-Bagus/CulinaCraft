"use client";
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Copyright from "@/components/copyright";

const RecipePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F9F9F9] font-sans">
      <Navbar />

      {/* Recipe Header */}
      <div className="w-3/4 bg-[#B6DEB0] p-6 rounded-2xl m-6 mx-auto flex items-center">
        <img
          src="/nasi-goreng.jpg"
          alt="Nasi Goreng"
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg mr-6 object-cover"
        />
        <div>
          <h1 className="text-lg sm:text-2xl text-[#F4E8B4] font-bold">Nasi Goreng</h1>
          <p className="text-gray-700 flex items-center gap-2 text-sm sm:text-base">
            <span>Kalori</span> <span className="text-yellow-600">⭐ 4.5</span> | <span>Fun Fact ❤️</span>
          </p>
          <p className="mt-2 text-sm text-white sm:text-base">
            A flavorful Indonesian fried rice cooked with garlic, soy sauce, and your choice of protein. 
            Quick, delicious, and perfect for any meal! Top with a fried egg for extra yum. 🍳
          </p>
        </div>
      </div>

      {/* Ingredients and Steps */}
      <div className="flex flex-wrap justify-center px-6 gap-6">
        <div className="bg-[#FFF3C4] p-6 rounded-lg w-full sm:w-1/3 relative">
          <h2 className="text-xl text-[#85A181] font-semibold bg-[#FFF3C4] px-4 py-2 rounded-t-lg absolute -top-4 left-6">
            Ingredients
          </h2>
          <ul className="mt-6 text-[#85A181] text-sm sm:text-base list-none space-y-1">
            <li>🍚 1 bowl of cooked rice</li>
            <li>🧄 2 cloves garlic, chopped</li>
            <li>🥄 1 tbsp soy sauce</li>
            <li>🥚 1 egg</li>
            <li>🍗 50g chicken or shrimp (optional)</li>
            <li>🫙 1 tbsp oil</li>
            <li>🧂 Salt & pepper to taste</li>
          </ul>
        </div>

        <div className="bg-[#FFF3C4] p-6 rounded-lg w-full sm:w-1/3 relative">
          <h2 className="text-xl text-[#85A181] font-semibold bg-[#FFF3C4] px-4 py-2 rounded-t-lg absolute -top-4 left-6">
            Steps
          </h2>
          <ol className="mt-6 text-[#85A181] text-sm sm:text-base list-none space-y-1">
            <li>🔥 Heat oil in a pan.</li>
            <li>🧄 Sauté garlic until fragrant.</li>
            <li>🍗 Add protein (chicken/shrimp) and cook.</li>
            <li>🥚 Push aside, crack an egg, and scramble.</li>
            <li>🍚 Add rice and mix well.</li>
            <li>🥄 Pour in soy sauce, salt, and pepper.</li>
            <li>🍽️ Stir-fry for a few minutes, then serve hot!</li>
          </ol>
        </div>
      </div>


      {/* Footer */}
      <Footer />
      <Copyright />
    </div>
  );
};

export default RecipePage;
