import createNextIntlPlugin from "next-intl/plugin";

const nextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // 👈 مهم جدًا
      },
      {
        protocol: "https",
        hostname: "cdn.salla.sa",
        pathname: "/**",
      },
    ],
  },
};

export default nextIntl(nextConfig);
