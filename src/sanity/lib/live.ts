// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
// Note: Live content API requires next-sanity v9+ with Next.js 15+
// This file is kept for future use when upgrading to compatible versions

import { client } from './client'

// Fallback implementation for older next-sanity versions
export const sanityFetch = async (query: string, params?: Record<string, unknown>) => {
  return await client.fetch(query, params || {})
}

export const SanityLive = () => null
