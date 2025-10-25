import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - ไม่พบหน้านี้ | Kalasin Travel',
  description: 'ขออภัย ดูเหมือนว่าหน้าที่คุณกำลังมองหาจะไม่มีอยู่',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="text-center">
        {/* ไอคอนหรือภาพประกอบ */}
        <div className="mb-4">
          <svg
            className="mx-auto h-24 w-24 text-blue-900"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* ข้อความหลัก */}
        <h1 className="text-6xl md:text-8xl font-bold text-blue-900">404</h1>
        <h2 className="mt-4 text-3xl font-semibold text-gray-800">ไม่พบหน้านี้</h2>
        <p className="mt-2 text-lg text-gray-600">
          ขออภัยด้วยครับ ดูเหมือนว่าหน้าที่คุณกำลังมองหาจะไม่มีอยู่
          <br />
          หรืออาจจะถูกย้ายไปยังที่อื่นแล้ว
        </p>

        {/* ปุ่มกลับไปหน้าแรก */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-blue-900 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all"
          >
            กลับไปหน้าแรก
          </Link>
        </div>

        {/* ข้อเสนอแนะเพิ่มเติม */}
        <div className="mt-8 text-sm text-gray-500">
          หรือคุณอาจจะสนใจ:
          <div className="mt-2 space-x-4">
            <Link href="/destinations" className="text-blue-600 hover:underline">
              สถานที่ท่องเที่ยว
            </Link>
            <span>|</span>
            <Link href="/about" className="text-blue-600 hover:underline">
              เกี่ยวกับเรา
            </Link>
            <span>|</span>
            <Link href="/contact" className="text-blue-600 hover:underline">
              ติดต่อเรา
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}