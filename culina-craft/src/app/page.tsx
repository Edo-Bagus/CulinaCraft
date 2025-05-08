"use client";
import RecipeCard from "@/components/card1";
import Navbar from "@/components/navbar";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import Footer from "@/components/footer";
import Copyright from "@/components/copyright";
import { useEffect, useState } from "react";
import { IRecipe } from "@/models/Recipe";

export default function Home() {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch("/api/recipes?sortBy=like&order=desc&limit=5");
        const data = await res.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen">
       <Navbar/>
      

      {/* Hero Section */}
      <section className="relative w-full">
        <Image src="/hero-banner (1).jpg" alt="Hero Image" width={1440} height={300} className="w-full h-[350px] object-cover" />
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-center">
          <h2 className="text-4xl font-bold text-white drop-shadow-lg"><span className="text-[#E7AC5F]">Culina</span>Craft</h2>
          <p className="text-white text-3xl mt-2 font-semibold tracking-wide">Where Creativity Meets Flavour</p>
        </div>
      </section>

{/* Mascot Section */}
<section className="py-12 px-16 flex items-center justify-center text-center w-full">
  <div className="flex items-center gap-6 max-w-4xl">
    {/* Teks */}
    <div className="text-left flex-1">
      <h3 className="text-3xl font-bold text-black leading-tight">
        Ready to cook up some
      </h3>
      <h3 className="text-3xl font-bold text-black leading-tight">
        fun and flavour?
      </h3>
      <h3 className="text-3xl font-bold text-black leading-tight">
        Let <span className="text-[#E7AC5F]">Culina</span>Craft do the magic!
      </h3>
    </div>

    {/* Maskot */}
    <div className="w-[130px] h-[130px] flex-shrink-0">
      <Image
        src="/maskotcc.png"
        alt="CulinaCraft Mascot"
        width={130}
        height={130}
      />
    </div>
  </div>
</section>

{/* Popular Recipes */}
<section className="bg-[#E7AC5F] py-12 px-16">
  <h3 className="text-3xl font-bold text-[#DD6840] text-center">Popular Recipes</h3>
  <p className="text-black text-md mt-1 text-center">Discover today’s delicious choices for simple, fun meals to make!</p>

  <div className="flex justify-start mt-8 space-x-8 py-4 overflow-x-auto w-full scrollbar-hide">
  {loading ? (
        <p>Loading...</p>
      ) : (
        recipes.map((recipe) => (
          <div key={String(recipe._id)} className="min-w-[280px] max-w-[300px] flex-shrink-0">
            <RecipeCard
              title={recipe.name}
              calories={`${recipe.calories} cal`}
              rating={recipe.rating}
              imageUrl="/resep1.jpg"
            />
          </div>
        ))
      )}
</div>



  <button className=" mt-8 px-6 py-2 bg-orange-700 text-white rounded-lg text-lg hover:bg-orange-800 transition duration-300 flex items-center justify-between w-auto">
  See More
  <FaArrowRight className="ml-2" />
</button>
</section>

{/* Today's Recipes */}
<section className="py-12 px-4 sm:px-6 md:px-10 lg:px-20">
  <h3 className="text-2xl sm:text-3xl font-bold text-black mb-4 text-center">
    Today's Recipes
  </h3>
  <p className="text-[#E7AC5F] text-sm sm:text-base mt-2 mb-6 text-center">
    Your perfect meal, every day! Personalized daily menu matched just for you.
  </p>

  <div className="mt-10 flex flex-col sm:flex-row sm:flex-wrap sm:justify-center gap-10">
    {[
      {
        time: "Pagi",
        title: "Ayam goreng",
        calories: "300 cal",
        rating: 4.5,
        imageUrl: "/resep1.jpg",
      },
      {
        time: "Siang",
        title: "Resep 2",
        calories: "250 cal",
        rating: 4.0,
        imageUrl: "/resep2.jpg",
      },
      {
        time: "Malam",
        title: "Resep 3",
        calories: "400 cal",
        rating: 5.0,
        imageUrl: "/resep3.jpg",
      },
    ].map((recipe, index) => (
      <div
        key={index}
        className="relative flex flex-col items-center w-full sm:w-72 max-w-sm mx-auto"
      >
        {/* Recipe Card */}
        <RecipeCard
          title={recipe.title}
          calories={recipe.calories}
          rating={recipe.rating}
          imageUrl={recipe.imageUrl}
        />

        {/* Label for Time */}
        <p
          className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-black text-sm sm:text-base font-medium px-6 py-2 rounded-t-full bg-[#B6DEB0] w-2/3 text-center"
        >
          {recipe.time}
        </p>
      </div>
    ))}
  </div>
</section>

{/* 
<!-- Create Your Own Menu Section --> */}
<section className="relative text-center py-12 px-16">
  {/* <!-- Hero Image as Background --> */}
  <div className="absolute inset-0 z-0">
    <img src="/hero-banner (1).jpg" alt="Hero Image" className="w-full h-full object-cover" />
  </div>
  
  <div className="relative z-10">
    {/* <!-- Section Heading --> */}
    <h3 className="text-4xl font-bold text-white">Create Your Own Menu!</h3>

    {/* <!-- Description Text --> */}
    <p className="text-xl font-light text-white mt-4">Make your perfect menu in a snap! Share your ideas, and we’ll craft a menu that’s uniquely yours!</p>

    {/* <!-- Button --> */}
    <div className="mt-8">
      <button className="px-6 py-2 bg-yellow-500 text-white rounded-full text-xl font-semibold hover:bg-yellow-600 focus:outline-none">
        Generate Recipe Here
      </button>
    </div>
  </div>
</section>
    <Footer />
    <Copyright />
    </div>
  );
}