import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "cdn.salla.sa"],
  },
  experimental: {
    middleware: true,
  },
};

export default withNextIntl(nextConfig);
