const routes = require("./src/routes.json");
/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => [
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
    {
      // Redirect all routes that don't match the above or start with a locale to /not-found
      source: "/((?!fi|en|se).*)",
      destination: "/fi/not-found",
      locale: false,
    },
  ],
};

module.exports = nextConfig;
