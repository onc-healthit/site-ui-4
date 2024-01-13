import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SITE UI 4.0',
  description: 'The Standards Implementation and Testing Environment (SITE) is a centralized collection ' +
    'of testing tools and resources designed to assist health IT developers and health IT users fully ' +
    'evaluate specific technical standards and maximize the potential of their health IT implementations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
