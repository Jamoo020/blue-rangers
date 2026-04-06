// Use environment-configured Strapi if available.
// Default to localhost during development so local dev hits your local backend.
const DEFAULT_STRAPI_URL = import.meta.env.DEV
  ? 'http://localhost:1337'
  : 'https://jolly-basket-d3988dc7c8.strapiapp.com'
const STRAPI_BASE_URL = import.meta.env.VITE_STRAPI_URL || DEFAULT_STRAPI_URL

export const CONTENT_URL = `${STRAPI_BASE_URL}/api/news-items?populate=*`
export const STRAPI_URL = STRAPI_BASE_URL
