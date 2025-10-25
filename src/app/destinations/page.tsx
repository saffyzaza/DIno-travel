// app/destinations/page.tsx
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import DestinationCard from '../components/DestinationCard';
import { Destination } from '@/types';
import destinationsData from '@/data/destinations.json';

// 1. สร้าง Component ย่อยเพื่อรวมส่วนที่ใช้ useSearchParams
function DestinationsContent() {
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const searchParams = useSearchParams(); // ✅ ใช้ useSearchParams ได้ที่นี่
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    let filtered = destinationsData.destinations;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (destination) =>
          destination.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          destination.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          destination.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((destination) => destination.category === selectedCategory);
    }

    setFilteredDestinations(filtered);
  }, [searchQuery, selectedCategory]);

  const categories = ['all', ...Array.from(new Set(destinationsData.destinations.map(d => d.category)))];

  return (
    <>
      {searchQuery && (
        <div className="mb-6 text-center">
          <p className="text-gray-600">ผลการค้นหาสำหรับ: <span className="font-bold">"{searchQuery}"</span></p>
        </div>
      )}

      <div className="mb-8 flex justify-center">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition ${
                selectedCategory === category
                  ? 'bg-blue-900 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category === 'all' ? 'ทั้งหมด' : category}
            </button>
          ))}
        </div>
      </div>

      {filteredDestinations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">ไม่พบสถานที่ท่องเที่ยวที่ตรงกับการค้นหา</p>
        </div>
      )}
    </>
  );
}

// 2. Component หลักของหน้า จะทำหน้าที่ครอบด้วย Suspense
export default function DestinationsPage() {
  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-900">สถานที่ท่องเที่ยวทั้งหมดในจังหวัดกาฬสินธุ์</h1>
        
        {/* 3. ส่วนสำคัญ: ครอบ Component ที่ใช้ useSearchParams ด้วย Suspense */}
        <Suspense fallback={
          <div className="flex justify-center items-center py-12">
            <div className="text-lg text-gray-500">กำลังโหลดข้อมูลสถานที่ท่องเที่ยว...</div>
          </div>
        }>
          <DestinationsContent />
        </Suspense>
      </div>
    </div>
  );
}