"use client";

import Image from "next/image";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#DD6840] p-4 w-full">
      {/* Wrapper dengan Responsivitas */}
      <div className="flex flex-row md:flex-row items-center justify-center md:justify-start max-w-screen-xl mx-auto gap-4 md:gap-10">
        {/* Logo & Nama Brand */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative w-10 h-10 md:w-16 md:h-16">
            <Image src="/logo.png" alt="CulinaCraft Logo" fill className="object-contain" />
          </div>
          <h1 className="text-lg md:text-[20px] font-bold text-center md:text-left">
            <span className="text-[#F7D197]">Culina</span>
            <span className="text-white">Craft</span>
          </h1>
        </div>

        {/* Ikon Media Sosial (Tetap Dekat dengan Logo) */}
        <div className="flex items-center gap-4 md:gap-5 text-white text-2xl">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F7D197]">
            <FaInstagram />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F7D197]">
            <FaXTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
