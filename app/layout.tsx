import type { Metadata } from 'next'
import LoadingScreen from '@/components/LoadingScreen'
import './globals.css'

export const metadata: Metadata = {
  title: 'Solalina Studios | Bayelsa\'s Premier Content Hub',
  description: 'Premier photography, videography, and podcast studio in Bayelsa State. Book your session today.',
  openGraph: {
    images: [
      {
        url: '/studio-1.jpg',
        width: 2070,
        height: 1380,
        alt: 'Solalina Studios',
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </head>
      <body>
        <LoadingScreen>
          {children}
        </LoadingScreen>
      </body>
    </html>
  )
}
