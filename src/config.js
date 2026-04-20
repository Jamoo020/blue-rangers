// Use environment-configured Strapi URLs
// Development: http://localhost:1337
// Production: https://your-strapi-instance.com (set via VITE_STRAPI_URL)

const DEFAULT_STRAPI_URL = import.meta.env.DEV
  ? 'http://localhost:1337'
  : null

const STRAPI_BASE_URL = import.meta.env.VITE_STRAPI_URL || DEFAULT_STRAPI_URL

if (!STRAPI_BASE_URL) {
  console.warn(
    '⚠️ VITE_STRAPI_URL not configured. News will fall back to local JSON. ' +
    'Set VITE_STRAPI_URL in your environment for production.'
  )
}

export const CONTENT_URL = STRAPI_BASE_URL
  ? `${STRAPI_BASE_URL}/api/news-items?populate=*`
  : null
export const STRAPI_URL = STRAPI_BASE_URL
