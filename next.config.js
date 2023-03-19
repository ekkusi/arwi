/** @type {import('next').NextConfig} */
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
});

const nextConfig = withPWA({
  output: "standalone",
});

module.exports = nextConfig
