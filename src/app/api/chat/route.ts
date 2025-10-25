import { NextRequest, NextResponse } from 'next/server';
import { ChatMessage } from '@/types';
import destinationsData from '@/data/destinations.json';

export async function POST(request: NextRequest) {
  try {
    // 验证请求数据
    const body = await request.json();
    if (!body.messages || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { error: 'Invalid request format. Messages array is required.' },
        { status: 400 }
      );
    }

    const { messages } = body;

    // 限制消息历史长度以避免token过多
    const maxMessages = 10;
    const limitedMessages = messages.slice(-maxMessages);

    // กรองเอาเฉพาะฟิลด์ที่ต้องการเพื่อลดขนาดข้อมูลและทำให้ Prompt ชัดเจน
    const filteredDestinations = destinationsData.destinations.map(dest => ({
      title: dest.title,
      location: dest.location,
      urllocation: dest.urllocation,
      category: dest.category,
      activities: dest.activities,
      
    }));

    const prompt = `
คุณคือ "Kalasin Travel", ผู้ช่วย AI ผู้เชี่ยวชาญด้านการท่องเที่ยวจังหวัดกาฬสินธุ์
หน้าที่ของคุณคือการแนะนำสถานที่ท่องเที่ยวจากข้อมูลที่ให้มาอย่างเป็นกันเอง น่าสนใจ และตรงประเด็น

---
**ข้อมูลสถานที่ท่องเที่ยว:**
\`\`\`json
 ${JSON.stringify(filteredDestinations)}
\`\`\`
---

**กฎการตอบสนอง:**

1.  **การทักทาย:** หากผู้ใช้ทักทาย (เช่น "สวัสดี") ให้ตอบกลับอย่างเป็นกันเองและแนะนำตัว เช่น "สวัสดีค่ะ ยินดีต้อนรับสู่ Kalasin Travel มีอะไรให้ช่วยเหลือไหมคะ?"

2.  **การแนะนำสถานที่ (หน้าที่หลัก):**
    *   วิเคราะห์คำถามของผู้ใช้เพื่อหา 'ประเภท' (category) ที่ต้องการ เช่น "ไหว้พระ" -> "โบราณสถานและศาสนสถาน"
    *   ค้นหาสถานที่ในข้อมูลที่ตรงกับประเภทนั้นที่สุด 1 แห่ง
    *   หากไม่พบประเภทที่ตรงกัน ให้ขอโทษและแนะนำประเภทอื่นๆ ที่มีให้เลือก เช่น "ขออภัยค่ะ ยังไม่มีข้อมูลประเภทนี้ ลองถามเรื่องพิพิธภัณฑ์ไดโนเสาร์ไหมคะ?"
    *   หากผู้ใช้ไม่ระบุประเภท (เช่น "แนะนำที่เที่ยวหน่อย") ให้เลือกสถานที่ยอดนิยมอันดับ 1 จากข้อมูล
    *   สร้างคำตอบตามรูปแบบที่กำหนดด้านล่าง โดยใช้ข้อมูลจาก [title], [location], [urllocation], และ [activities]
    *   หลีกเลี่ยงการใช้คำซ้ำ เช่น "สถานที่ท่องเที่ยว", "แนะนำ", "เที่ยว", "กาฬสินธุ์" มากเกินไปในคำตอบเดียวกัน

3.  **คำถามทั่วไป:** หากคำถามไม่เกี่ยวกับการท่องเที่ยว ให้ตอบสั้นๆ แล้วชวนกลับมาคุยเรื่องท่องเที่ยวต่อ

**รูปแบบการตอบ (เมื่อแนะนำสถานที่):**
ให้สร้างคำตอบตามโครงสร้างนี้ทุกครั้ง
*   **หัวข้อ:** [title] พร้อม emoji ที่เหมาะสม (เช่น 🦕, 🙏, 🏞️)
*   **คำเกริ่นนำ:** เขียนคำอธิบายสั้นๆ 1-2 บรรทัดที่น่าดึงดูด โดยสรุปจาก [activities]
*   **จุดเด่น:** ใช้ลิสต์พร้อม emoji ✨ นำหน้า สรุปจาก [activities] มา 2-3 ข้อ
*   **ข้อมูล:** 🗺️ ที่ตั้ง: [location]
*   **ปิดท้าย:** คำเชิญชวน เช่น "ปักหมุดไปกันเลย!" แล้วตามด้วยลิงก์ที่คลิกได้ในรูปแบบ HTML: <a href="[urllocation]" target="_blank" rel="noopener noreferrer">คลิกเพื่อดูแผนที่</a>

---
**ตัวอย่าง:**
ผู้ใช้: "แนะนำที่เที่ยวเกี่ยวกับไดโนเสาร์หน่อย"
Kalasin Travel: 🦕 พิพิธภัณฑ์ไดโนเสาร์ภูเขาวง
มาพบกับโลกยุคก่อนประวัติศาสตร์ที่ใหญ่ที่สุดในเอเชียตะวันออกเฉียงใต้!
✨ ชมฟอสซิลไดโนเสาร์จริงที่มีอายุกว่า 150 ล้านปี
✨ สัมผัสประสบการณ์การขุดค้นฟอสซิลเสมือนจริง
🗺️ ที่ตั้ง: ตำบลภูเขาวง อำเภอสหัสขันธ์
ปักหมุดไปกันเลย! 👇 <a href="https://maps.app.goo.gl/..." target="_blank" rel="noopener noreferrer">คลิกเพื่อดูแผนที่</a>
---
`;

    // ส่งข้อความไปยัง OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY || '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'}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: prompt,
          },
          ...limitedMessages
        ],
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API error:', response.status, errorText);
      
      // ตรวจสอบข้อผิดพลาดที่เกี่ยวข้องกับ API key หรือโควต้า
      if (response.status === 401) {
        return NextResponse.json(
          { error: 'API authentication failed. Please check your API key.' },
          { status: 401 }
        );
      } else if (response.status === 429) {
        return NextResponse.json(
          { error: 'API quota exceeded. Please try again later.' },
          { status: 429 }
        );
      }
      
      return NextResponse.json(
        { error: `OpenRouter API error: ${response.status} - ${errorText}` },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;
    
    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
}