/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bank.hackclub.com",
      },
    ],
  },
};

module.exports = nextConfig;
