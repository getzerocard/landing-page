import '../styles/global.css'
import { FontLoader } from '@/components/FontLoader'

export const metadata = {
  title: 'Zerocard',
  description: 'Spend crypto like cash with Zerocard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <meta property="og:image" content="/ogimage.png" />
      </head>
      <body>
        <FontLoader />
        {children}
      </body>
    </html>
  )
}
