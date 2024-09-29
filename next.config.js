const { hostname } = require("os");

const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "uploadthing.com" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "utfs.io" },
    ],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
