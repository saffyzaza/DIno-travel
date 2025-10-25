import Link from 'next/link';


const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-400">แนะนำแหล่งท่องเที่ยวกาฬสินธุ์</h3>
            <p className="mb-4">ค้นพบสถานที่ท่องเที่ยวที่น่าสนใจในจังหวัดกาฬสินธุ์</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-yellow-400 transition">Facebook</a>
              <a href="#" className="hover:text-yellow-400 transition">Instagram</a>
              <a href="#" className="hover:text-yellow-400 transition">Twitter</a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-400">ลิงก์ด่วน</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-yellow-400 transition">หน้าแรก</Link></li>
              <li><Link href="/destinations" className="hover:text-yellow-400 transition">สถานที่ท่องเที่ยว</Link></li>
              <li><Link href="/about" className="hover:text-yellow-400 transition">เกี่ยวกับเรา</Link></li>
              <li><Link href="/contact" className="hover:text-yellow-400 transition">ติดต่อเรา</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-400">ติดต่อเรา</h3>
            <p>123 ถนนท่องเที่ยว ตำบลในเมือง</p>
            <p>อำเภอเมืองกาฬสินธุ์ จังหวัดกาฬสินธุ์ 46000</p>
            <p>โทร: 043-xxx-xxxx</p>
            <p>อีเมล: info@kalasin-tourism.com</p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-blue-800 text-center">
          <p>&copy; 2023 แนะนำแหล่งท่องเที่ยวกาฬสินธุ์. สงวนลิขสิทธิ์</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;