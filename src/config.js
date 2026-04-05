// Use environment-configured Strapi if available.
// In development, fall back to local Strapi if available.
const STRAPI_DEV_URL = 'http://localhost:1337'
const STRAPI_BASE_URL = import.meta.env.VITE_STRAPI_URL || (import.meta.env.DEV ? STRAPI_DEV_URL : 'https://jolly-basket-d3988dc7c8.strapiapp.com')

export const CONTENT_URL = `${STRAPI_BASE_URL}/api/news-items?populate=*`
export const STRAPI_URL = STRAPI_BASE_URL
