import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import ReactQueryProvider from './ReactQueryProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Beat Sheet',
  description:
    'A screenwriting app used to plan the content and structure of videos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ReactQueryProvider>
  )
}
