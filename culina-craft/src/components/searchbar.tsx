import React from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: () => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  value,
  onChange,
  onSearch,
  className,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        className="bg-white text-gray-600 px-4 py-2 rounded-full w-full outline-none focus:ring-2 focus:ring-orange-400"
      />
      <button
        onClick={onSearch}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#B6DEB0] hover:text-[#dd6840] transition"
        aria-label="Search"
      >
        <FaSearch size={18} />
      </button>
    </div>
  );
};

export default SearchBar;
