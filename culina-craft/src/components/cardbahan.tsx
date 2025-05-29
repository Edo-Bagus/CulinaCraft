"use client";

import React from "react";
import Image from "next/image";
import { FaRegSquare, FaCheckSquare } from "react-icons/fa";

interface CardBahanProps {
  title: string;
  imageUrl: string;
  width?: string;
  selected?: boolean;
  onSelect?: () => void;
}

const CardBahan: React.FC<CardBahanProps> = ({
  title,
  imageUrl,
  width = "100%",
  selected = false,
  onSelect,
}) => {
  return (
    <div
      className={`bg-white rounded-2xl p-4 flex items-center space-x-4 md:w-[200px] h-[59px] transition-all duration-200 ${
        selected ? "ring-2 ring-orange-500 bg-orange-50" : ""
      }`}
      style={{ width }}
    >

      {/* Nama Bahan */}
      <h2 className="text-[18px] font-regular text-[#DD6840] flex-grow">{title}</h2>

      {/* Checkbox */}
      <button onClick={onSelect} className="text-orange-600 text-2xl">
        {selected ? <FaCheckSquare /> : <FaRegSquare />}
      </button>
    </div>
  );
};

export default CardBahan;
