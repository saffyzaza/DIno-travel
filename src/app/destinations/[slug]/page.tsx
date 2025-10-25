import { notFound } from 'next/navigation';
import Image from 'next/image';
import ImageGallery from '../../components/ImageGallery';
import { Destination } from '@/types';
import destinationsData from '@/data/destinations.json';
import Link from 'next/dist/client/link';

// เปลี่ยน component เป็น async function
export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>; // params เป็น Promise
}) {
  // ใช้ await เพื่อแกะค่า slug ออกจาก params
  const { slug } = await params;

  const destinations: Destination[] = destinationsData.destinations;
  const destination = destinations.find((d) => d.id === slug); // ใช้ slug แทน params.slug

  if (!destination) {
    notFound();
  }

  // ดึงข้อมูลสถานที่อื่นมา 2 แห่งเพื่อแสดงใน sidebar
  const otherDestinations = destinations
    .filter((d) => d.id !== slug)
    .slice(0, 2);

  // ฟังก์ชัน renderStars ไม่ได้ถูกใช้งานแล้ว (เนื่องจากส่วนรีวิวถูก comment out)
  // จึงสามารถลบออกได้ หรือเก็บไว้หากจะใช้งานในอนาคต

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/*
          <h1 className="text-4xl font-bold mb-4 text-blue-900">{destination.title}</h1>
          ... (ส่วน location/rating ที่ comment out ไว้) ...
        */}

        {/* --- Hero Image (ปรับใหม่ตามรูป) --- */}
        <div className="relative h-96 w-full mb-8">
          <Image
            src={destination.imageUrl}
            alt={destination.title}
            fill
            className="object-cover rounded-lg"
            unoptimized
          />
          {/* เพิ่ม Overlay และข้อความทับรูป */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-lg flex flex-col justify-end p-6">
            <h1 className="text-4xl font-bold text-white">
              {destination.title}
            </h1>
            {/* คำบรรยายนี้ hardcoded มาจากในรูปเพื่อให้เหมือนตัวอย่าง */}
            <p className="text-2xl text-yellow-400 mt-1">
              {destination.titlesub[0]}
            </p>
          </div>
        </div>

        {destination.gallery && (
          <ImageGallery images={destination.gallery} title={destination.title} />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- คอลัมน์ซ้าย (ปรับใหม่ตามรูป) --- */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              {destination.title}
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              {destination.description}
            </p>

            {/* แผนที่ (ย้ายมาจากด้านขวา) */}
            

            {/* ส่วนเนื้อหาที่ 2 และข้อมูล (ตามในรูป) */}
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              ข้อมูลเพิ่มเติมเกี่ยวกับ {destination.titlesub[0]}
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              {destination.descriptionsub[0]}
            </p>

            {/* ข้อมูลที่อยู่/เวลา (ย้ายมาจากด้านขวาและจัดสไตล์ใหม่) */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 space-y-3">
              <div className="flex items-start">
                <span className="text-lg mr-2 pt-1">📍</span>
                <span className="text-gray-700">
                  <strong>ที่อยู่:</strong> {destination.address}
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-lg mr-2 pt-1">🕒</span>
                <span className="text-gray-700">
                  <strong>เวลาเปิด-ปิด:</strong> {destination.openingHours}
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-lg mr-2 pt-1">📞</span>
                <span className="text-gray-700">
                  <strong>เบอร์โทรศัพท์:</strong> {destination.phone}
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-lg mr-2 pt-1">💰</span>
                <span className="text-gray-700">
                  <strong>ราคาตั๋ว:</strong> {destination.ticketPrice}
                </span>
              </div>
            </div>

            {/* ข้อความส่วนที่ 2 (ใช้ placeholder จากในรูป) */}
            <p className="text-gray-700 mb-6 leading-relaxed">
              ส่วนภายในอาคารนั้นจะจัดแสดงนิทรรศการต่างๆ มากมาย
              ทั้งนิทรรศการถาวร และนิทรรศการชั่วคราว
              โดยมีการจัดแสดงหุ่นจำลองไดโนเสาร์
              ข้อมูลเกี่ยวกับการกำเนิดโลกและประวัติศาสตร์ต่างๆ
              ที่ให้ทั้งความรู้และความเพลิดเพลินแก่ผู้เข้าชม
            </p>

            {/* ลบส่วน "กิจกรรมน่าสนใจ" ที่เป็น list ul ออก */}
            {/* ... (ส่วน "รีวิวจากผู้ใช้" ที่ comment out ไว้) ... */}
          </div>

          {/* --- คอลัมน์ขวา (ปรับใหม่ตามรูป) --- */}
          <div>
            <div className="bg-white p-0 rounded-lg border border-gray-200">
              <div className="h-64 sm:h-48 w-full relative shadow-md ">
                <a href={destination.urllocation[0]} rel="noopener noreferrer">
              <Image
                src="https://assets.telegraphindia.com/telegraph/2025/Jul/1753862848_google.jpg"
                alt={`แผนที่ ${destination.location}`}
                width={500}
                height={250}
                className="hover:opacity-75 transition-opacity w-full h-full object-cover"
                blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/Pz6ZAAAAAElFTkSuQmCC'
              />
                </a>              
              </div>
              <div className="flex justify-between items-center p-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Other Destinations
                </h3>
                <Link href="/destinations" className="block py-2 hover:text-yellow-400 transition">See All</Link>
              </div>

              <div className="space-y-0">
                {/* Loop สร้าง Card สถานที่อื่น */}
                {otherDestinations.map((other) => (
                  <div key={other.id} className="border-t border-gray-200">
                    <div className="relative h-36">
                      <Image
                        src={other.imageUrl}
                        alt={other.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-lg mb-1">{other.title}</h4>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {other.description}
                      </p>
                      <a
                        href={`/destinations/${other.id}`} // สมมติว่า path เป็นแบบนี้
                        className="text-blue-900 font-semibold hover:underline"
                      >
                        View More
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ลบ "ข้อมูลด่วน" และ "แผนที่" ของเดิมจากตรงนี้ */}
          </div>
        </div>
      </div>
    </div>
  );
}