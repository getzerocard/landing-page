/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 * https://www.sanity.io/docs/studio/embedding-sanity-studio
 */

import dynamicImport from 'next/dynamic'

// Force dynamic rendering to avoid build-time issues with React context
export const dynamic = 'force-dynamic'
export const dynamicParams = true

// Define metadata manually for compatibility
export const metadata = {
  title: 'Sanity Studio',
  description: 'Sanity Studio',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

// Dynamically import NextStudio to avoid SSR issues during build
// Config is imported inside the component to prevent build-time evaluation
const NextStudio = dynamicImport(() => import('next-sanity/studio').then((mod) => mod.NextStudio), {
  ssr: false,
})

export default async function StudioPage() {
  // Import config dynamically to avoid build-time evaluation
  const config = (await import('../../../../../sanity.config')).default
  return <NextStudio config={config} />
}

