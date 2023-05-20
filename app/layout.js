//import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{margin: 0}} className={inter.className}>{children}</body>
    </html>
  )
}
