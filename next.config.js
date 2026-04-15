/** @type {import('next').NextConfig} */
const nextConfig = {
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
