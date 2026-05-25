import type { Metadata } from 'next'
import './globals.css'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'

export const metadata: Metadata = {
  title: 'Solalina Studios | Warri\'s Premier Content Hub',
  description: 'Premier photography, videography, and podcast studio in Warri, Delta State. Book your session today.',
  openGraph: {
    images: [
      {
        url: 'https://images.unsplash.com/photo-1605296867424-35fc25c9212a?q=80&w=2070&auto=format&fit=crop',
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
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  )
}
