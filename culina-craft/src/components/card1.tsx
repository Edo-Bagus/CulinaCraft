"use client";

import React from "react";
import Image from "next/image";
import { FaRegHeart, FaStar } from "react-icons/fa";

interface RecipeCardProps {
  title: string;
  calories: string;
  rating: number;
  imageUrl: string;
  width?: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ title, calories, rating, imageUrl }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 w-[302px] 
                    transition-transform duration-300 hover:scale-105">
      {/* Gambar Resep */}
      <div>
        <Image
          src={imageUrl}
          alt={title}
          width={256} 
          height={160} 
          className="w-full h-40 object-cover rounded-xl"
        />
      </div>

      {/* Konten Resep */}
      <div className="mt-3">
        {/* Nama Resep */}
        <h2 className="text-[20px] font-bold text-[#85A181] font-semibold">{title}</h2>

        {/* Informasi Kalori */}
        <p className="text-gray-800 font-medium text-[15px]">{calories}</p>

        {/* Rating & Favorit */}
        <div className="flex items-center mt-2 text-yellow-500">
          {/* Rating */}
          <FaStar size={18} />
          <span className="ml-1 text-black font-normal text-[15px]">{rating}</span>

          {/* Favorit Icon di Kanan */}
          <button className="text-[#DD6840] ml-auto">
            <FaRegHeart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
