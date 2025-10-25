import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'กรุณากรอกข้อมูลให้ครบถ้วน' },
        { status: 400 }
      );
    }

    // ตรวจสอบรูปแบบอีเมล
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'รูปแบบอีเมลไม่ถูกต้อง' },
        { status: 400 }
      );
    }

    console.log('Received contact form submission:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);

    // *** ส่วนสำคัญ: จัดการข้อมูลที่ได้รับ ***
    // ในสถานการณ์จริง คุณควรทำสิ่งใดสิ่งหนึ่งต่อไปนี้:
    // 1. ส่งอีเมลแจ้งเตือนไปยังแอดมิน (โดยใช้บริการเช่น Resend, SendGrid, Nodemailer)
    // 2. บันทึกข้อมูลลงฐานข้อมูล (เช่น MongoDB, PostgreSQL)
    // 3. บันทึกลงใน Google Sheets
    
    // ตัวอย่างการส่งอีเมล (ต้องติดตั้ง library และตั้งค่าก่อน)
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'onboarding@resend.dev',
    //   to: 'admin@yourdomain.com',
    //   subject: `มีข้อความใหม่จาก ${name}`,
    //   html: `<p><strong>ชื่อ:</strong> ${name}</p><p><strong>อีเมล:</strong> ${email}</p><p><strong>ข้อความ:</strong> ${message}</p>`,
    // });

    return NextResponse.json(
      { message: 'ส่งข้อความสำเร็จ' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'เซิร์ฟเวอร์ขัดข้อง กรุณาลองใหม่ในภายหลัง' },
      { status: 500 }
    );
  }
}