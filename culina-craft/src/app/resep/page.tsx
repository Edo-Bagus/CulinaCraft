"use client";
import RecipeCard from "@/components/card1";
import Navbar from "@/components/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      {/* Top Picks Recipes Section */}
        <section className="bg-[#F4E8B4] py-12 px-6 sm:px-16 rounded-t-xl">
        <h2 className="text-3xl font-bold text-[#DD6840] text-center">Top Picks Recipes</h2>
        <p className="text-black text-md mt-1 text-center">Explore the most favorite recipes, loved by many and perfect for any meal!</p>
        
        <div className="flex justify-center mt-8 space-x-8 py-4 no-scrollbar w-full">
            <RecipeCard
            title="Ayam Penyet Surabaya Makassar Solo Pekanbaru Jakarta"
            calories="300 cal"
            rating={4.5}
            imageUrl="/resep1.jpg" // Ganti dengan path gambar yang sesuai
            width="302px"
            />
            <RecipeCard
            title="Ayam Penyet Surabaya Makassar Solo Pekanbaru Jakarta"
            calories="300 cal"
            rating={4.5}
            imageUrl="/resep1.jpg" // Ganti dengan path gambar yang sesuai
            width="302px"
            />
            <RecipeCard
            title="Ayam Penyet Surabaya Makassar Solo Pekanbaru Jakarta"
            calories="300 cal"
            rating={4.5}
            imageUrl="/resep1.jpg" // Ganti dengan path gambar yang sesuai
            width="302px"
            />
        </div>
        </section>



      {/* Fresh Pick Recipes Section */}
      <section className="bg-[#89A88F] py-10 px-6">
        <h2 className="text-2xl font-bold text-center text-[#F4E8B4] mb-1">Fresh Pick Recipes</h2>
        <p className="text-sm text-center text-white mb-8">The freshest and new recipes, ready to try!</p>
        <div className="mt-8 flex overflow-x-auto space-x-8 py-4 no-scrollbar w-full">
          {[ 
            { title: "Resep 1", calories: "300 cal", rating: 4.5, imageUrl: "/resep1.jpg" },
            { title: "Resep 2", calories: "250 cal", rating: 4.0, imageUrl: "/resep2.jpg" },
            { title: "Resep 3", calories: "400 cal", rating: 5.0, imageUrl: "/resep3.jpg" },
            { title: "Resep 4", calories: "350 cal", rating: 4.2, imageUrl: "/resep4.jpg" },
          ].map((recipe, index) => (
            <div key={index} className="flex-shrink-0 w-72">
              <RecipeCard
                title={recipe.title}
                calories={recipe.calories}
                rating={recipe.rating}
                imageUrl={recipe.imageUrl}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Recipe Finder Section */}
      <section className="bg-[#FFF2BF] py-10 px-6">
        <h2 className="text-2xl font-bold text-center text-[#DD6840] mb-1">Recipe Finder</h2>
        <p className="text-sm text-center text-black-700 mb-6">Got ingredients? Find the perfect recipe in seconds!</p>
        <div className="flex justify-center mb-6">
          <div className="flex w-full max-w-xl bg-white rounded-full shadow-md px-4 py-2">
            <input
              type="text"
              placeholder="Craving something? Search here!"
              className="flex-grow px-2 text-sm outline-none bg-transparent"
            />
            <button className="text-[#E86F24] text-xl font-bold">🔍</button>
          </div>
        </div>
        <div className="mt-8 flex overflow-x-auto space-x-8 py-4 no-scrollbar w-full">
          {[ 
            { title: "Resep 1", calories: "300 cal", rating: 4.5, imageUrl: "/resep1.jpg" },
            { title: "Resep 2", calories: "250 cal", rating: 4.0, imageUrl: "/resep2.jpg" },
            { title: "Resep 3", calories: "400 cal", rating: 5.0, imageUrl: "/resep3.jpg" },
            { title: "Resep 4", calories: "350 cal", rating: 4.2, imageUrl: "/resep4.jpg" },
          ].map((recipe, index) => (
            <div key={index} className="flex-shrink-0 w-72">
              <RecipeCard
                title={recipe.title}
                calories={recipe.calories}
                rating={recipe.rating}
                imageUrl={recipe.imageUrl}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
