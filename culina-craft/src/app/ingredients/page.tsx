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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const res = await fetch("/api/ingredient"); // Pastikan ini endpoint kamu
        if (!res.ok) {
          throw new Error("Failed to fetch ingredients");
        }
        const data = await res.json();
        setIngredients(data); // Karena data sudah array
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Title Section */}
      <div className="text-center mt-6">
        <h1 className="text-2xl font-bold text-orange-500">Pick and Cook</h1>
        <p className="text-gray-600">
          Quickly check what you have and plan your next meal!
        </p>
      </div>

      {/* Container utama */}
      <main className="flex flex-col md:flex-row flex-grow px-6 md:px-12 py-6 gap-8">
        {/* Sidebar Bahan */}
        <aside className="w-full md:w-[510px] bg-[#F7D197] p-4 rounded-lg flex flex-col h-[400px]">
          {/* Search Bar */}
          <div className="mb-4">
            <SearchBar
              placeholder="What ingredients you have?"
              className="md:w-[480px]"
            />
          </div>

          {/* Daftar bahan */}
          <div className="overflow-y-auto flex-grow space-y-3 pr-3 scrollbar-hide">
            {loading ? (
              <p>Loading ingredients...</p>
            ) : ingredients.length === 0 ? (
              <p>No ingredients found.</p>
            ) : (
              ingredients.map((ingredient) => (
                <CardBahan
                  key={ingredient._id}
                  imageUrl="/bahanayam.jpg" // Semua pakai gambar default karena datamu belum ada gambar
                  title={ingredient.name}
                />
              ))
            )}
          </div>
        </aside>

        {/* Konten utama */}
        <section className="flex-1">
          {/* Filter Bar */}
          <div className="flex items-center justify-start gap-4 my-4">
            <div
              className="flex items-center bg-white border border-black px-3 py-1 rounded-full text-black 
                            hover:border-[#e7ac5f] hover:bg-[#f4e8b4] transition duration-200 ease-in-out"
            >
              <span className="text-sm">Chicken</span>
              <button className="ml-2 text-[#b6deb0] hover:text-[#dd6840]">✖</button>
            </div>

            <button
              className="text-[#dd6840] border border-[#dd6840] px-3 py-1 rounded-full text-sm 
                              hover:bg-[#e7ac5f] hover:text-white transition duration-200 ease-in-out"
            >
              Clear All
            </button>
          </div>

          {/* Grid Resep */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {Array(6)
              .fill(null)
              .map((_, index) => (
                <RecipeCard
                  key={index}
                  title="Ayam Penyet Surabaya Makassar Solo Pekanbaru Jakarta"
                  calories="300 cal"
                  rating={4.5}
                  imageUrl="/resep1.jpg"
                />
              ))}
          </div>
        </section>
      </main>

      <Footer />
      <Copyright />
    </div>
  );
}