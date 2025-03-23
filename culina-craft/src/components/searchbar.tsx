import React from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  placeholder: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, className }) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        className="bg-white text-gray-600 px-4 py-2 rounded-full w-full outline-none"
      />
      <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#B6DEB0]">
        <FaSearch size={18} />
      </button>
    </div>
  );
};

export default SearchBar;