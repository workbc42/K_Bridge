import './globals.css'
import { Sora, Newsreader } from 'next/font/google'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
})

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
})

export const metadata = {
  title: 'K-Meal Bridge',
  description: 'A delivery assistant service for foreigners in Korea',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${newsreader.variable}`}>{children}</body>
    </html>
  )
}
