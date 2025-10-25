import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import ChatBot from './components/ChatBot'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'แนะนำแหล่งท่องเที่ยวกาฬสินธุ์',
  description: 'ค้นพบสถานที่ท่องเที่ยวที่น่าสนใจในจังหวัดกาฬสินธุ์',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <ChatBot />
        </div>
      </body>
    </html>
  )
}