/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // appDir is now the default and no longer needs to be specified
  },
  eslint: {
    // Ignore warnings during development
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
}

module.exports = nextConfig
