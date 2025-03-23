"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaRegSquare, FaCheckSquare } from "react-icons/fa";

interface CardBahanProps {
  title: string;
  imageUrl: string;
  width?: string; // Optional width prop
}

const CardBahan: React.FC<CardBahanProps> = ({ title, imageUrl, width = "100%" }) => {
  const [checked, setChecked] = useState(false);

  return (
    <div
      className="bg-white rounded-2xl p-4 flex items-center space-x-4 md:w-[200px] h-[59px]"
      style={{ width }}
    >
      {/* Gambar Bahan */}
      <Image
        src={imageUrl}
        alt={title}
        width={60}
        height={60}
        className="w-[49px] h-[49px] object-cover rounded-full"
      />

      {/* Nama Bahan */}
      <h2 className="text-[18px] font-regular text-[#DD6840] flex-grow">{title}</h2>

      {/* Checkbox dengan React Icons */}
      <button onClick={() => setChecked(!checked)} className="text-orange-600 text-2xl">
        {checked ? <FaCheckSquare /> : <FaRegSquare />}
      </button>
    </div>
  );
};

export default CardBahan;