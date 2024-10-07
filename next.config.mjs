/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "izalkffitpywrrlhomsn.supabase.co",
        port: "",
      },
    ],
  },
};

export default nextConfig;
