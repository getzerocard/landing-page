import React from 'react'
import '../styles/global.css'
import { FontLoader } from '@/components/FontLoader'


const siteConfig = {
  name: 'Zerocard',
  description: 'Spend crypto like cash with Zerocard. The ultimate non-custodial crypto card.',
  url: 'https://getzerocard.com',
  ogImage: '/ogimage.webp',
}


export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Zerocard - Spend crypto like cash',
      },
    ],
  },


  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@getzerocard',
  },


  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <FontLoader />
        {children}
      </body>
    </html>
  )
}