import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Legalo - AI-Powered Legal Assistant',
  description: 'Empower your contract with intelligent legal advice and support. Created in collaboration with UK lawyers and advisors.',
  keywords: ['legal', 'AI', 'assistant', 'contract', 'law', 'advice'],
  authors: [{ name: 'Legalo Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#0ea5e9',
  openGraph: {
    title: 'Legalo - AI-Powered Legal Assistant',
    description: 'Empower your contract with intelligent legal advice and support.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Legalo - AI-Powered Legal Assistant',
    description: 'Empower your contract with intelligent legal advice and support.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-white text-legal-900`}>
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}
