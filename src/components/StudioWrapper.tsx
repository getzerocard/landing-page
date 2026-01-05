'use client'

import dynamicImport from 'next/dynamic'
import { useEffect, useState } from 'react'

// Dynamically import NextStudio to avoid SSR issues
const NextStudio = dynamicImport(() => import('next-sanity/studio').then((mod) => mod.NextStudio), {
  ssr: false,
})

export default function StudioWrapper() {
  const [config, setConfig] = useState<any>(null)

  useEffect(() => {
    // Import config on client side only
    import('../../sanity.config').then((mod) => {
      setConfig(mod.default)
    })
  }, [])

  if (!config) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Loading Studio...</div>
      </div>
    )
  }

  return <NextStudio config={config} />
}

