'use client';

// import global styles
import '../globals.css';
import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '@/types';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // โหลดข้อความจาก localStorage เมื่อ component โหลด
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    const savedTimestamp = localStorage.getItem('chatTimestamp');
    
    // ตรวจสอบว่ามีข้อมูลเก่าเกิน 3 วันหรือไม่
    if (savedTimestamp && savedMessages) {
      const timestamp = new Date(savedTimestamp);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - timestamp.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      // ถ้าเกิน 3 วัน ให้ล้างข้อมูล
      if (diffDays > 3) {
        localStorage.removeItem('chatMessages');
        localStorage.removeItem('chatTimestamp');
        setMessages([{ role: 'assistant', content: 'สวัสดีครับ! มีอะไรให้ช่วยเหลือไหมครับ?' }]);
      } else {
        // ถ้าไม่เกิน 3 วัน ให้โหลดข้อมูลเก่า
        setMessages(JSON.parse(savedMessages));
      }
    } else {
      // ถ้าไม่มีข้อมูลเก่า ให้เริ่มใหม่
      setMessages([{ role: 'assistant', content: 'สวัสดีครับ! มีอะไรให้ช่วยเหลือไหมครับ?' }]);
    }
  }, []);

  // บันทึกข้อความลง localStorage เมื่อมีการเปลี่ยนแปลง
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
      localStorage.setItem('chatTimestamp', new Date().toISOString());
    }
  }, [messages]);

  // ฟังก์ชันสำหรับล้างประวัติการสนทนา
  const handleClearChat = () => {
    // ล้างข้อมูลใน localStorage
    localStorage.removeItem('chatMessages');
    localStorage.removeItem('chatTimestamp');
    
    // รีเซ็ตข้อความเป็นข้อความเริ่มต้น
    setMessages([{ role: 'assistant', content: 'สวัสดีครับ! มีอะไรให้ช่วยเหลือไหมครับ?' }]);
    
    // ล้างข้อความที่กำลังพิมพ์
    setInputMessage('');
    
    // ล้างข้อความแสดงข้อผิดพลาด
    setError(null);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    setError(null);
    const userMessage: ChatMessage = { role: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error);
        const errorMessage: ChatMessage = { role: 'assistant', content: 'ขออภัยครับ: ' + data.error };
        setMessages(prev => [...prev, errorMessage]);
      } else {
        const assistantMessage: ChatMessage = { role: 'assistant', content: data.message };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่');
      const errorMessage: ChatMessage = { role: 'assistant', content: 'ขออภัยครับ เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่อีกครั้ง' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-full">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl w-90 max-w-[120vw] h-[500px] flex flex-col">
          <div className="bg-blue-900 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold">แชทบอทท่องเที่ยวกาฬสินธุ์</h3>
            <div className="flex space-x-2">
              <button
                onClick={handleClearChat}
                className="text-white hover:text-gray-200"
                title="ล้างประวัติการสนทนา"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="grow overflow-y-auto p-4 space-y-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-100 ml-auto max-w-[80%]'
                    : 'bg-gray-100 mr-auto max-w-[80%]'
                }`}
              >
                {/* แสดงข้อความโดยใช้ dangerouslySetInnerHTML เพื่อให้ลิงก์สามารถคลิกได้ */}
                <div 
                  dangerouslySetInnerHTML={{
                    __html: message.content.replace(/\n/g, '<br />')
                  }}
                />
              </div>
            ))}
            {isLoading && (
              <div className="bg-gray-100 mr-auto max-w-[80%] p-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-4 border-t">
            {error && (
              <div className="text-red-500 text-sm mb-2">{error}</div>
            )}
            <div className="flex">
              <input
                type="text"
                placeholder="พิมพ์ข้อความ..."
                className="grow border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                className={`bg-blue-900 text-white px-4 py-2 rounded-r-lg hover:bg-blue-800 transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoading || !inputMessage.trim()}
              >
                ส่ง
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-900 text-white p-4 rounded-full shadow-lg hover:bg-blue-800 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ChatBot;