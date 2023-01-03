/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bank.hackclub.com",
        pathname: "/storage/blobs/redirect/**",
      },
    ],
  },
};

module.exports = nextConfig;
