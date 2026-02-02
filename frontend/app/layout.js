export const metadata = {
  title: 'K-Meal Bridge',
  description: 'A delivery assistant service for foreigners in Korea',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}