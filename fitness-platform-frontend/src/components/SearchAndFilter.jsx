import React, { useState } from "react";
import { fetchClasses } from "../services/api";

const SearchAndFilter = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    date: "",
    time: "",
    trainer: "",
  });

  const handleSearch = async () => {
    try {
      const response = await fetchClasses({ searchTerm, ...filters });
      onSearch(response.data);
    } catch (error) {
      console.error("Failed to fetch classes:", error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Search and Filter Classes</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Search</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Search classes..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Date</label>
          <input
            type="date"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Time</label>
          <input
            type="time"
            value={filters.time}
            onChange={(e) => setFilters({ ...filters, time: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Trainer</label>
          <input
            type="text"
            value={filters.trainer}
            onChange={(e) => setFilters({ ...filters, trainer: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="Trainer name"
          />
        </div>
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchAndFilter;