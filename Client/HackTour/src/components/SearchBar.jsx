import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mt-6">
      <input
        type="text"
        className="px-4 py-2 w-full bg-gray-800 text-white rounded-full"
        placeholder="Search for a hack..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
