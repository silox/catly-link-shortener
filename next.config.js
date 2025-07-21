/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['deztqbtkaowswiogpjws.supabase.co'],
  },
};

module.exports = nextConfig;

const intercept = require('intercept-stdout');

intercept((text) => (text.includes('Duplicate atom key') ? '' : text));
