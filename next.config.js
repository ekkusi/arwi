/** @type {import('next').NextConfig} */
const cacheRules = require("./src/sw-cache");

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  workboxOptions: {
    runtimeCaching: cacheRules
  }
});

const nextConfig = withPWA({
  output: "standalone",
  run
});


module.exports = nextConfig
