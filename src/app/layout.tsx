import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

// ─── Update these ──────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Your Name — Portfolio',
  description:
    'Software engineer building thoughtful digital products. Focused on performance, craft, and the details that matter.',
  openGraph: {
    title: 'Your Name — Portfolio',
    description:
      'Software engineer building thoughtful digital products. Focused on performance, craft, and the details that matter.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Name — Portfolio',
    description:
      'Software engineer building thoughtful digital products.',
  },
}
// ──────────────────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-zinc-950 text-zinc-100 min-h-screen">{children}</body>
    </html>
  )
}
