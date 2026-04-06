// Use environment-configured Strapi if available.
// Otherwise default to production Strapi.
const STRAPI_BASE_URL = import.meta.env.VITE_STRAPI_URL || 'https://jolly-basket-d3988dc7c8.strapiapp.com'

export const CONTENT_URL = `${STRAPI_BASE_URL}/api/news-items?populate=*`
export const STRAPI_URL = STRAPI_BASE_URL
