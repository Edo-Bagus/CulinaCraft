"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Copyright from "@/components/copyright";
import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { IUser } from "@/models/Users";
import { IoMdAdd } from "react-icons/io";

export default function UploadRecipePage() {
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [steps, setSteps] = useState([""]);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleStepChange = (index: number, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const addIngredient = () => setIngredients([...ingredients, ""]);
  const addStep = () => setSteps([...steps, ""]);

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    const payload = {
      name: recipeName,
      ingredients: ingredients.filter((item) => item.trim() !== ""),
      steps: steps.filter((item) => item.trim() !== ""),
    };
  
    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) {
        throw new Error("Failed to upload recipe");
      }
  
      const data = await res.json();
      console.log("Recipe uploaded:", data);
      alert("Recipe uploaded successfully!");
  
      // Reset form
      setRecipeName("");
      setIngredients([""]);
      setSteps([""]);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to upload recipe");
    }
  };
  
  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center px-4 py-10">
        <h1 className="text-[35px] font-semibold">Upload Recipe</h1>
        <p className="text-[#E7AC5F] mt-2 text-center">
          Share Your Culinary Creations! Upload your recipe and inspire food lovers everywhere!
        </p>

        <div className="bg-[#85A181] text-white p-6 rounded-2xl w-full max-w-5xl mt-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Section (Recipe Form) */}
            <div className="flex-1">
              {/* Recipe Name */}
              <div className="mb-4">
                <label className="block text-lg mb-1">Recipe Name</label>
                <input
                  type="text"
                  value={recipeName}
                  onChange={(e) => setRecipeName(e.target.value)}
                  placeholder="ex : Scrambled Egg"
                  className="w-full p-2 text-black rounded-md"
                />
              </div>

              {/* Ingredients */}
              <div className="mb-4">
                <label className="block text-lg mb-1">Ingredients</label>
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <span className="bg-[#E7AC5F] px-3 py-1 rounded-full">{index + 1}</span>
                    <input
                      type="text"
                      value={ingredient}
                      onChange={(e) => handleIngredientChange(index, e.target.value)}
                      placeholder="ex : 1 pcs Egg"
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
                  <IoMdAdd size={20} className="mr-1 text-[#B6DEB0]" /> Ingredient
                </button>
              </div>

              {/* Steps */}
              <div className="mb-4">
                <label className="block text-lg mb-1">Step by Step</label>
                {steps.map((step, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <span className="bg-[#E7AC5F] px-3 py-1 rounded-full">{index + 1}</span>
                    <input
                      type="text"
                      value={step}
                      onChange={(e) => handleStepChange(index, e.target.value)}
                      placeholder="ex : Prepare all ingredients"
                      className="w-full p-2 text-black rounded-md"
                    />
                    <button onClick={() => removeStep(index)} className="text-[#B6DEB0]">
                      <FaRegTrashAlt size={20} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addStep}
                  className="flex items-center bg-[#DD6840] px-3 py-1 rounded-full mt-2"
                >
                  <IoMdAdd size={20} className="mr-1 text-[#B6DEB0]" /> Step
                </button>
              </div>
            </div>

            {/* Right Section (Image Upload) */}
            <div className="flex-1">
              <label className="block text-lg mb-1">Upload Photo</label>
              <div className="border-2 border-dashed border-gray-300 p-6 rounded-md text-center">
                {image ? (
                  <img src={image} alt="Recipe" className="w-full h-full object-cover rounded-md" />
                ) : (
                  <p>Upload a photo of your dish to showcase your recipe</p>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full mt-2"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-6 gap-4">
            <button className="bg-white text-[#DD6840] px-4 py-2 rounded-md border border-[#DD6840]">
              Cancel Upload
            </button>
            <button 
              className="bg-[#DD6840] text-white px-4 py-2 rounded-md"
              onClick={handleSubmit}
            >
              Submit Recipe
            </button>
          </div>
        </div>
      </main>
      <Footer />
      <Copyright />
    </div>
  );
}
