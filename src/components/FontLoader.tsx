'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'

const SquircleNoScript = dynamic(
  () => import('@squircle-js/react').then((mod) => mod.SquircleNoScript),
  { ssr: false }
)

export function FontLoader() {
  useEffect(() => {
    // Font loading optimization
    if ('fonts' in document) {
      // Check if fonts are loaded and add class to prevent FOUT
      Promise.all([
        document.fonts.load('400 16px "SF Pro Display"'),
        document.fonts.load('500 16px "SF Pro Display"'),
        document.fonts.load('600 16px "SF Pro Display"'),
        document.fonts.load('700 16px "SF Pro Display"'),
      ]).then(() => {
        document.documentElement.classList.add('fonts-loaded')
      }).catch(() => {
        // Fallback: add class after timeout
        setTimeout(() => {
          document.documentElement.classList.add('fonts-loaded')
        }, 100)
      })
    } else {
      // Fallback for browsers without Font Loading API
      setTimeout(() => {
        document.documentElement.classList.add('fonts-loaded')
      }, 100)
    }
  }, [])

  return <SquircleNoScript />
}

