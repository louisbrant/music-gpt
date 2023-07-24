/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    blvd: {
      businessId: process.env.BLVD_BUSINESS_ID,
      apiKey: process.env.BLVD_API_KEY,
      apiSecret: process.env.BLVD_API_SECRET,
    },
  },
};

module.exports = nextConfig;