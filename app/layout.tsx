import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Solalina Studios | Warri\'s Premier Content Hub',
  description: 'Premier photography, videography, and podcast studio in Warri, Delta State. Book your session today.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
