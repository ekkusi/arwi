/** @type {import('next').NextConfig} */
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
});

const nextConfig = withPWA({
  experimental: {
    appDir: true,
  },
  output: "standalone",
});

module.exports = nextConfig
