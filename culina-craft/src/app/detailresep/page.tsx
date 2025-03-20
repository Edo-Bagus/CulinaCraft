// components/RecipeCard.tsx
"use client";
import Image from 'next/image';
import Navbar from "@/components/navbar";

const RecipeCard = () => {
  return (
    <section className="bg-[#F1F1F1] p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
      <Navbar />
      
      {/* Recipe Details Section */}
      <div className="flex items-center space-x-4 mb-6">
        <Image
          src="/path/to/recipe-image.jpg" // Update this to the correct path
          alt="Nasi Goreng"
          width={96}
          height={96}
          className="rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-semibold">Nasi Goreng</h2>
          <p className="text-sm text-gray-500">Kalori: 450 | <span className="text-yellow-400">⭐⭐⭐⭐</span></p>
          <p className="text-sm text-gray-500">Fun Fact: Quick, delicious, and perfect for any meal!</p>
        </div>
      </div>

      {/* Ingredients and Steps Section */}
      <div className="flex justify-center space-x-6 mb-6">
        {/* Ingredients Section */}
        <aside className="bg-white p-4 rounded-lg shadow-md w-1/3">
          <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>1 bowl of cooked rice</li>
            <li>2 cloves garlic, chopped</li>
            <li>1 tbsp soy sauce</li>
            <li>1 egg</li>
            <li>50g chicken or shrimp (optional)</li>
            <li>1 tbsp oil</li>
            <li>Salt & pepper to taste</li>
          </ul>
        </aside>

        {/* Steps Section */}
        <aside className="bg-white p-4 rounded-lg shadow-md w-1/3">
          <h3 className="text-xl font-semibold mb-4">Steps</h3>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Heat oil in a pan.</li>
            <li>Sauté garlic until fragrant.</li>
            <li>Add protein (chicken/shrimp) and cook.</li>
            <li>Push aside, crack an egg, and scramble.</li>
            <li>Add rice and mix well.</li>
            <li>Pour in soy sauce, salt, and pepper.</li>
            <li>Stir-fry for a few minutes, then serve hot!</li>
          </ol>
        </aside>
      </div>
    </section>
  );
};

export default RecipeCard;
