"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#DD6840] p-2">
      <div className="container mx-auto max-w-screen-lg flex flex-wrap items-center justify-between">
        {/* Logo */}
        <div className="flex items-center md:-ml-20">
          <div className="relative w-12 h-12 md:w-16 md:h-16">
            <Link href="/">
              <Image src="/logo.png" alt="CulinaCraft Logo" fill className="object-contain" />
            </Link>
          </div>
          {/* <h1 className="text-white text-lg md:text-xl font-bold">CulinaCraft</h1> */}
          <h1 className="text-lg md:text-[20px] font-bold ml-0">
            <span className="text-[#F7D197]">Culina</span>
            <span className="text-white">Craft</span>
          </h1>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Menu Items */}
        <ul
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:space-x-10 text-white text-text-[20px] font-medium w-full md:w-auto mt-4 md:mt-0 md:-mr-10`}
        >
          <li>
            <Link href="/" className="block md:inline p-3 md:p-3">
              Recipes
            </Link>
          </li>
          <li>
            <Link href="/ingredients" className="block md:inline p-3 md:p-3">
              Ingredients
            </Link>
          </li>
          <li>
            <Link href="/nutrition" className="block md:inline p-3 md:p-3">
              Nutrition
            </Link>
          </li>
          <li>
            <Link href="/profile" className="block md:inline p-3 md:p-3">
              Profile
            </Link>
          </li>
        </ul>

        {/* Search Bar */}
        <div className="relative hidden md:block md:-mr-20">
          <input
            type="text"
            placeholder="Hungry? Let’s find your perfect meal!"
            className="bg-white text-gray-600 px-4 py-2 rounded-full md:w-[350px] outline-none text-[15px]"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#B6DEB0]">
            <FaSearch size={18} />
          </button>
        </div>
      </div>

      {/* Search Bar (Mobile) - Muncul Hanya Jika Menu Dibuka */}
      {isOpen && (
        <div className="relative mt-4 md:hidden">
          <input
            type="text"
            placeholder="Search..."
            className="bg-white text-gray-600 px-4 py-2 rounded-full w-full outline-none"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#B6DEB0]">
            <FaSearch size={18} />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
