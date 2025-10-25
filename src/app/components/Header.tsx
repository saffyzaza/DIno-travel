'use client';

import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-blue-800 text-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center">
          <span className="text-yellow-400">กาฬสินธุ์</span> ท่องเที่ยว
        </Link>
        
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-yellow-400 transition">หน้าแรก</Link>
          <Link href="/destinations" className="hover:text-yellow-400 transition">สถานที่ท่องเที่ยว</Link>
          <Link href="/about" className="hover:text-yellow-400 transition">เกี่ยวกับเรา</Link>
          <Link href="/contact" className="hover:text-yellow-400 transition">ติดต่อเรา</Link>
        </nav>
        
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-blue-800 px-4 py-2">
          <Link href="/" className="block py-2 hover:text-yellow-400 transition">หน้าแรก</Link>
          <Link href="/destinations" className="block py-2 hover:text-yellow-400 transition">สถานที่ท่องเที่ยว</Link>
          <Link href="/about" className="block py-2 hover:text-yellow-400 transition">เกี่ยวกับเรา</Link>
          <Link href="/contact" className="block py-2 hover:text-yellow-400 transition">ติดต่อเรา</Link>
        </div>
      )}
    </header>
  );
};

export default Header;