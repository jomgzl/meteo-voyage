// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vos options de configuration Next.js habituelles ici
};

module.exports = withBundleAnalyzer(nextConfig);