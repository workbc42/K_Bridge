import './globals.css'
import { Sora, Newsreader, Noto_Sans_KR, Kanit, Playfair_Display } from 'next/font/google'
import AppProviders from '@/components/providers/AppProviders'

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

const notoSansKr = Noto_Sans_KR({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-noto-sans-kr',
  display: 'swap',
})

const kanit = Kanit({
  weight: ['300', '400', '500', '600'],
  subsets: ['thai', 'latin'],
  variable: '--font-kanit',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata = {
  title: 'K-Meal Bridge',
  description: 'A delivery assistant service for foreigners in Korea',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body className={`${sora.variable} ${newsreader.variable} ${notoSansKr.variable} ${kanit.variable} ${playfair.variable}`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
