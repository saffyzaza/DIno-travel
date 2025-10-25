'use client';

import { useState, FormEvent } from 'react';
import { Metadata } from 'next';

// หากต้องการใช้ metadata ใน Client Component อาจจะต้องย้ายไปใช้ใน layout หรือสร้าง Server Component ครอบ
// export const metadata: Metadata = { ... };

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'ส่งข้อความของคุณเรียบร้อยแล้ว! เราจะติดต่อกลับโดยเร็วที่สุด' });
        setFormData({ name: '', email: '', message: '' }); // ล้างฟอร์ม
      } else {
        setStatus({ type: 'error', message: data.error || 'เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                ติดต่อ <span className="text-blue-900">เรา</span>
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                หากคุณมีคำถามหรือข้อเสนอแนะ อย่าลังเลที่จะติดต่อเรา
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">ส่งข้อความถึงเรา</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      ชื่อของคุณ
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      อีเมล
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      ข้อความ
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {isLoading ? 'กำลังส่ง...' : 'ส่งข้อความ'}
                  </button>
                </form>
                {status.message && (
                  <div className={`mt-4 p-4 rounded-md ${status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    {status.message}
                  </div>
                )}
              </div>

              {/* Contact Info */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">ข้อมูลการติดต่อ</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">อีเมล</h3>
                    <p className="text-gray-600">contact@kalasintravel.com</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">เบอร์โทรศัพท์</h3>
                    <p className="text-gray-600">+66 XX XXX XXXX</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">ที่อยู่</h3>
                    <p className="text-gray-600">
                      123 ถนนกาฬสินธุ์<br />
                      อำเภอเมือง จังหวัดกาฬสินธุ์ 46000
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">เวลาทำการ</h3>
                    <p className="text-gray-600">
                      จันทร์ - ศุกร์: 9:00 AM - 5:00 PM<br />
                      เสาร์ - อาทิตย์: ปิด
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}