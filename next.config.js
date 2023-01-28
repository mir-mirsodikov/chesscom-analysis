/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.chesscomfiles.com",
        port: '',
        pathname: "/**/*",
      }
    ],
    minimumCacheTTL: 31536000
  }
}

module.exports = nextConfig
