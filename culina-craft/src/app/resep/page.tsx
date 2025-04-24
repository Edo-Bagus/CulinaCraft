"use client";
import RecipeCard from "@/components/card1";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Copyright from "@/components/copyright"
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      {/* Top Picks Recipes Section */}
        <section className="py-12 px-6 sm:px-16 rounded-t-xl">
        <h2 className="text-3xl font-bold text-[#DD6840] text-center">Top Picks Recipes</h2>
        <p className="text-black text-md mt-1 text-center">Explore the most favorite recipes, loved by many and perfect for any meal!</p>
        
        <div className="flex justify-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-8">
            <RecipeCard
            title="Ayam Penyet Surabaya Makassar Solo Pekanbaru Jakarta"
            calories="300 cal"
            rating={4.5}
            imageUrl="/resep1.jpg" 
            width="302px"
            />
            <RecipeCard
            title="Ayam Penyet Surabaya Makassar Solo Pekanbaru Jakarta"
            calories="300 cal"
            rating={4.5}
            imageUrl="/resep1.jpg" 
            width="302px"
            />
            <RecipeCard
            title="Ayam Penyet Surabaya Makassar Solo Pekanbaru Jakarta"
            calories="300 cal"
            rating={4.5}
            imageUrl="/resep1.jpg"
            width="302px"
            />
        </div>
        </section>

        {/* {Fresh Pick Recipe} */}
          <section className="bg-[#85A181] py-10 px-6">
          <h2 className="text-2xl font-bold text-center text-[#F4E8B4] mb-1">Fresh Pick Recipes</h2>
          <p className="text-sm text-center text-white mb-8">The freshest and new recipes, ready to try!</p>
          <div className="mt-8 flex overflow-x-auto space-x-8 py-4 no-scrollbar w-full">
            <div className="flex-shrink-0 w-max">
              <RecipeCard
                title="Ayam Penyet Surabaya Makassar Solo Pekanbaru Jakarta"
                calories="300 cal"
                rating={4.5}
                imageUrl="/resep1.jpg"
                width="302px"
              />
            </div>
            <div className="flex-shrink-0 w-max">
              <RecipeCard
                title="Ayam Penyet Surabaya Makassar Solo Pekanbaru Jakarta"
                calories="300 cal"
                rating={4.5}
                imageUrl="/resep1.jpg"
                width="302px"
              />
            </div>
            <div className="flex-shrink-0 w-max">
              <RecipeCard
                title="Ayam Penyet Surabaya Makassar Solo Pekanbaru Jakarta"
                calories="300 cal"
                rating={4.5}
                imageUrl="/resep1.jpg"
                width="302px"
              />
            </div>
            <div className="flex-shrink-0 w-max">
              <RecipeCard
                title="Ayam Penyet Surabaya Makassar Solo Pekanbaru Jakarta"
                calories="300 cal"
                rating={4.5}
                imageUrl="/resep1.jpg"
                width="302px"
              />
            </div>
            <div className="flex-shrink-0 w-max">
              <RecipeCard
                title="Ayam Penyet Surabaya Makassar Solo Pekanbaru Jakarta"
                calories="300 cal"
                rating={4.5}
                imageUrl="/resep1.jpg"
                width="302px"
              />
            </div>
            <div className="flex-shrink-0 w-max">
              <RecipeCard
                title="Ayam Penyet Surabaya Makassar Solo Pekanbaru Jakarta"
                calories="300 cal"
                rating={4.5}
                imageUrl="/resep1.jpg"
                width="302px"
              />
            </div>
          </div>
        </section>

          {/* Recipe Finder Section */}
          <section className="mt-8 bg-[#FFF2BF] py-10 px-6">
            <h2 className="mt text-2xl font-bold text-center text-[#DD6840] mb-1">Recipe Finder</h2>
            <p className="mt-8 text-sm text-center text-black-700 mb-6">Got ingredients? Find the perfect recipe in seconds!</p>
            <div className="flex-justify-center mb-6">
              <div className="flex max-w-full bg-white rounded-full shadow-md px-4 py-2">
                <input
                  type="text"
                  placeholder="Craving something? Search here!"
                  className="flex-grow px-2 text-sm outline-none bg-transparent"
                />
                <button className="text-[#E86F24] text-xl font-bold">🔍</button>
              </div>
            </div>
            <div className="flex justify-center mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
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
                <RecipeCard
                title="Ayam Penyet Surabaya Makassar Solo Pekanbaru Jakarta"
                calories="300 cal"
                rating={4.5}
                imageUrl="/resep1.jpg" // Ganti dengan path gambar yang sesuai
                width="302px"
                />
            </div>
          </section>
    
          <Footer />
          <Copyright />

    </div>
  );
}
