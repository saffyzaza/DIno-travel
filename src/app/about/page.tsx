import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'เกี่ยวกับเรา - Kalasin Travel',
  description: 'เรียนรู้เพิ่มเติมเกี่ยวกับ Kalasin Travel และภารกิจของเราในการเป็นผู้ช่วยด้านการท่องเที่ยวจังหวัดกาฬสินธุ์',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                เกี่ยวกับ <span className="text-blue-900">Kalasin Travel</span>
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                ผู้ช่วย AI ของคุณสำหรับการสำรวจจังหวัดกาฬสินธุ์
              </p>
            </div>

            {/* Content Section */}
            <div className="prose prose-lg text-gray-700 mx-auto">
              <h2 className="text-2xl font-semibold text-blue-900">ภารกิจของเรา</h2>
              <p>
                Kalasin Travel เกิดจากความตั้งใจที่อยากให้ทุกคนได้เปิดประสบการณ์และค้นพับสถานที่ท่องเที่ยวที่น่าสนใจในจังหวัดกาฬสินธุ์อย่างง่ายดายและสะดวกสบาย 
                เราเชื่อว่าทุกมุมของกาฬสินธุ์ล้วนมีเรื่องราวและความงามที่รอการค้นพบ ไม่ว่าจะเป็นแหล่งโบราณคดี พิพิธภัณฑ์ไดโนเสาร์ที่มีชื่อเสียง หรือธรรมชาติอันอุดมสมบูรณ์
              </p>
              <p>
                ด้วยเทคโนโลยี AI ของเราจะช่วยให้คุณได้รับข้อมูลที่เป็นประโยชน์ แนะนำสถานที่ที่ตรงกับความสนใจ และวางแผนการเดินทางได้อย่างมั่นใจ
              </p>

              <h2 className="text-2xl font-semibold text-blue-900 mt-8">ทำไมต้อง Kalasin Travel?</h2>
              <ul>
                <li><strong>ข้อมูลที่ถูกต้องและเป็นปัจจุบัน:</strong> ข้อมูลสถานที่ท่องเที่ยวของเราถูกรวบรวมและตรวจสอบเพื่อให้แน่ใจว่าคุณได้รับข้อมูลที่ดีที่สุด</li>
                <li><strong>บริการฟรีตลอด 24 ชั่วโมง:</strong> ผู้ช่วย AI ของเราพร้อมให้บริการคุณตลอดเวลา ไม่ว่าคุณจะวางแผนการเดินทางตอนไหนก็ตาม</li>
                <li><strong>การแนะนำที่เป็นส่วนตัว:</strong> AI ของเราจะวิเคราะห์คำถามของคุณเพื่อแนะนำสถานที่ที่เหมาะกับความต้องการของคุณโดยเฉพาะ</li>
              </ul>

              <h2 className="text-2xl font-semibold text-blue-900 mt-8">ทีมงานของเรา</h2>
              <p>
                เราคือทีมงานนักพัฒนาและผู้เชี่ยวชาญด้านการท่องเที่ยวที่มีความหลงใหลในจังหวัดกาฬสินธุ์บ้านเกิด 
                ด้วยประสบการณ์และความเข้าใจในท้องถิ่น เราจึงมั่นใจว่าจะสามารถมอบประสบการณ์ที่ดีที่สุดให้กับนักท่องเที่ยวทุกคน
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}