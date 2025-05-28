import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto mb-12">
      <div className="flex gap-4 relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-2 py-3 lg:px-6 lg:py-4 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-red-750 focus:bg-gray-750 transition-colors duration-200 text-lg"
        />
        <div className="absolute right-0 top-[2px]">
          <button
            type="submit"
            disabled={isLoading || !query.trim}
            className="bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white text-sm px-3 py-2 lg:px-6 lg:py-3 rounded-lg font-medium transition-colors min-w-[100px]"
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>
    </form>
  );
}
