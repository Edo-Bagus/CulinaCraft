"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Copyright from "@/components/copyright";
import { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { useSearchParams } from "next/navigation";

export default function GenerateRecipePage() {
  // Ambil query params dari URL
  const searchParams = useSearchParams();

  // State bahan yang dipilih
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([""]);

  // Saat halaman pertama kali load, cek apakah ada query ingredients, jika ada parse dan set state
  useEffect(() => {
    const ingredientsParam = searchParams.get("ingredients");
    if (ingredientsParam) {
      // Pisahkan berdasarkan koma dan trim tiap elemen, filter elemen kosong
      const ingredientsFromQuery = ingredientsParam
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
      if (ingredientsFromQuery.length > 0) {
        setSelectedIngredients(ingredientsFromQuery);
      }
    }
  }, [searchParams]);

  const handleIngredientChange = (index: number, value: string) => {
    const updated = [...selectedIngredients];
    updated[index] = value;
    setSelectedIngredients(updated);
  };

  const addIngredient = () => setSelectedIngredients([...selectedIngredients, ""]);

  const removeIngredient = (index: number) => {
    setSelectedIngredients(selectedIngredients.filter((_, i) => i !== index));
  };

  const handleGenerate = () => {
    // Placeholder - tidak melakukan apa-apa
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center px-4 py-10">
        <h1 className="text-[35px] font-semibold">Generate Recipe</h1>
        <p className="text-[#E7AC5F] mt-2 text-center">
          Prepare your ingredients and get a personalized recipe instantly.
        </p>

        <div className="bg-[#85A181] text-white p-6 rounded-2xl w-full max-w-5xl mt-6">
          <div className="mb-4">
            <label className="block text-lg mb-1">Your Ingredients</label>
            {selectedIngredients.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <span className="bg-[#E7AC5F] px-3 py-1 rounded-full">{index + 1}</span>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                  placeholder="ex: 2 pcs egg"
                  className="w-full p-2 text-black rounded-md"
                />
                <button onClick={() => removeIngredient(index)} className="text-[#B6DEB0]">
                  <FaRegTrashAlt size={20} />
                </button>
              </div>
            ))}
            <button
              onClick={addIngredient}
              className="flex items-center bg-[#DD6840] px-3 py-1 rounded-full mt-2"
            >
              <IoMdAdd size={20} className="mr-1 text-[#B6DEB0]" /> Add Ingredient
            </button>
          </div>

          <div className="flex justify-end mt-6 gap-4">
            <button
              onClick={handleGenerate}
              className="bg-[#DD6840] text-white px-4 py-2 rounded-md"
            >
              Generate Recipe
            </button>
          </div>
        </div>
      </main>
      <Footer />
      <Copyright />
    </div>
  );
}
