/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "cdn.simpleicons.org",
      },
    ],
  },
};

export default nextConfig;
