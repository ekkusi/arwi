const withBuilderDevTools = require("@builder.io/dev-tools/next")();
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const routes = require("./src/routes.json");

/** @type {import('next').NextConfig} */
const nextConfig = withBuilderDevTools(
  withBundleAnalyzer({
    output: "standalone",
    rewrites: async () => {
      return [
        {
          source: "/",
          destination: "/fi",
          locale: false,
        },
        {
          source: "/not-found",
          destination: "/fi/not-found",
          locale: false,
        },
        // Fi routes without /fi prefix
        ...Object.keys(routes.fi).map((route) => ({
          source: routes.fi[route],
          destination: `/fi${route}`,
          locale: false,
        })),
        ...Object.keys(routes.se).map((route) => ({
          source: `/se${routes.se[route]}`,
          destination: `/se${route}`,
          locale: false,
        })),
        // Redirect all routes that don't match the above or start with a locale to /fi/:path*
        {
          source: "/:path((?!fi|en|se).*)",
          destination: "/fi/:path*",
          locale: false,
        },
        {
          // Redirect all routes that don't match the above or start with a locale to /not-found
          source: "/((?!fi|en|se).*)",
          destination: "/fi/not-found",
          locale: false,
        },
      ];
    },
    experimental: {
      serverActions: true,
    },
  })
);

module.exports = nextConfig;
