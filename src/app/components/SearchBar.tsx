'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/destinations?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto ">
      <div className="flex items-center bg-white rounded-full overflow-hidden">
        <input
          type="text"
          placeholder="ค้นหาสถานที่ท่องเที่ยว..."
          className="flex-grow px-6 py-3 text-gray-700 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold px-6 py-3 transition"
        >
          ค้นหา
        </button>
      </div>
    </form>
  );
};

export default SearchBar;