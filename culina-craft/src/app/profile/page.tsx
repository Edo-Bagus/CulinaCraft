import React from "react";
import Navbar from "@/components/navbar";
import RecipeCard from "@/components/card1";
import Footer from "@/components/footer";
import Copyright from "@/components/copyright";
import { IoMdAdd } from "react-icons/io";
import SearchBar from "@/components/searchbar";

const ProfilePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar />
    <main className="p-6">
    <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-6 p-4 lg:p-6 bg-gray-50">
  {/* Sidebar */}
  <div className="w-full lg:w-1/2 bg-white p-4 lg:p-6 shadow-md rounded-lg">
    <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-6">
      {/* Left: Profile Info */}
      <div className="w-full lg:flex-1">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 lg:w-40 lg:h-40 bg-[#E3E2E2] rounded-full"></div>
          <h1 className="text-[#E7AC5F] text-lg font-semibold mt-3 lg:mt-4">Name</h1>
          <p className="text-xs lg:text-sm text-gray-500 text-center mt-1 lg:mt-2">
            "Cooking my way through flavors! Exploring, creating, and sharing delicious moments one recipe at a time."
          </p>
          <div className="text-xs lg:text-sm text-gray-500 mt-3 lg:mt-4">
            <p>Joined since: November 2024</p>
          </div>
        </div>
      </div>

      {/* Separator Line - Only visible on lg screens */}
      <div className="hidden lg:block w-[2px] h-auto bg-gray-400 mx-2 lg:mx-4"></div>

      {/* Right: My Recipes, Tried Recipes, and Preferences */}
      <div className="w-full lg:flex-1 mt-4 lg:mt-0">
        <div className="flex flex-col gap-2">
          <div className="bg-orange-100 text-orange-600 px-3 py-1 lg:px-4 lg:py-2 rounded-lg text-center text-sm lg:text-base">
            My Recipes: <strong>5</strong>
          </div>
          <div className="bg-yellow-100 text-yellow-600 px-3 py-1 lg:px-4 lg:py-2 rounded-lg text-center text-sm lg:text-base">
            Tried Recipes: <strong>10</strong>
          </div>
        </div>

        {/* Preferences */}
        <div className="mt-4 lg:mt-6 w-full">
          <h3 className="font-semibold text-center mb-2 lg:mb-4 text-sm lg:text-base">Preferences</h3>
          <div className="mb-3 lg:mb-4">
            <h4 className="text-xs lg:text-sm font-medium">Western, Asian, Italian</h4>
            <div className="w-full bg-gray-200 rounded-full h-3 lg:h-4 mt-1 lg:mt-2 flex">
              <div className="bg-green-600 h-3 lg:h-4 rounded-l-full" style={{ width: "40%" }}></div>
              <div className="bg-yellow-400 h-3 lg:h-4" style={{ width: "30%" }}></div>
              <div className="bg-green-400 h-3 lg:h-4 rounded-r-full" style={{ width: "30%" }}></div>
            </div>
          </div>
          <div className="mb-3 lg:mb-4">
            <h4 className="text-xs lg:text-sm font-medium">Dessert, Snacks, Main Course</h4>
            <div className="w-full bg-gray-200 rounded-full h-3 lg:h-4 mt-1 lg:mt-2 flex">
              <div className="bg-yellow-400 h-3 lg:h-4 rounded-l-full" style={{ width: "30%" }}></div>
              <div className="bg-green-600 h-3 lg:h-4" style={{ width: "40%" }}></div>
              <div className="bg-green-400 h-3 lg:h-4 rounded-r-full" style={{ width: "30%" }}></div>
            </div>
          </div>
          <div className="mb-3 lg:mb-4">
            <h4 className="text-xs lg:text-sm font-medium">Grilled, Fried, Steamed</h4>
            <div className="w-full bg-gray-200 rounded-full h-3 lg:h-4 mt-1 lg:mt-2 flex">
              <div className="bg-green-400 h-3 lg:h-4 rounded-l-full" style={{ width: "50%" }}></div>
              <div className="bg-green-600 h-3 lg:h-4" style={{ width: "30%" }}></div>
              <div className="bg-yellow-400 h-3 lg:h-4 rounded-r-full" style={{ width: "20%" }}></div>
            </div>
          </div>
          <p className="text-xs lg:text-sm text-gray-500">Allergy: Peanuts, Beans</p>
        </div>
      </div>
    </div>
  </div>

  {/* Refrigerator Section */}
  <div className="w-full lg:w-1/2 bg-[#E3E2E2] rounded-lg shadow-md p-4 lg:p-6">
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
    <h3 className="text-base lg:text-lg font-medium text-gray-800">My Refrigerator</h3>
    <button className="flex items-center bg-white text-black px-3 py-1.5 lg:px-4 lg:py-2 rounded-full mt-2 sm:mt-0 text-sm lg:text-base">
      <IoMdAdd size={18} className="mr-1 lg:mr-2 text-[#B6DEB0]" /> Add Ingredient
    </button>
  </div>
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4 mt-4 lg:mt-6 overflow-y-auto max-h-64 lg:max-h-72 scrollbar-hide">
    {Array(55).fill("Chicken 500 gr").map((item, index) => (
      <div
        key={index}
        className="text-center text-sm p-3 bg-white rounded-md shadow-md hover:shadow-lg transition-shadow duration-200 min-w-[100px]"
      >
        {item}
      </div>
    ))}
  </div>
  <div className="flex justify-start mt-4 lg:mt-6">
    <button className="flex items-center bg-[#DD6840] text-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-sm lg:text-base">
      <IoMdAdd size={18} className="mr-1 text-[#B6DEB0]" /> Cook Now
    </button>
  </div>
</div>
</div>


        {/* Favorite Recipes */}
        <section className="mt-6">
          <h3 className="text-lg font-medium text-gray-800">Favorite Recipes</h3>
          <div className="flex justify-start space-x-8 py-4 overflow-x-auto w-full scrollbar-hide">
            {Array(10).fill(null).map((_, index) => (
              <div key={index} className="min-w-[280px] max-w-[300px] flex-shrink-0">
                <RecipeCard
                  title="Ayam Penyet Surabaya Makassar Solo Pekanbaru Jakarta"
                  calories="300 cal"
                  rating={4.5}
                  imageUrl="/resep1.jpg"
                />
              </div>
            ))}
          </div>
        </section>

        {/* My Recipes */}
        <section className="mt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-800">My Recipes</h3>
            <button className="flex items-center bg-[#DD6840] text-white px-3 py-1 rounded-full mt-2">
              <IoMdAdd size={20} className="mr-1 text-[#B6DEB0]" /> Upload More Recipes
            </button>
          </div>
          <div className="flex justify-start space-x-8 py-4 overflow-x-auto w-full scrollbar-hide">
            {Array(10).fill(null).map((_, index) => (
                    <div key={index} className="min-w-[280px] max-w-[300px] flex-shrink-0">
                        <RecipeCard
                        title="Ayam Penyet Surabaya Makassar Solo Pekanbaru Jakarta"
                        calories="300 cal"
                        rating={4.5}
                        imageUrl="/resep1.jpg"
                        // width="100%" // Pastikan responsif
                        />
                    </div>
            ))}
        </div>
        </section>
      </main>
      <Footer />
      <Copyright />
    </div>
  );
};

export default ProfilePage;