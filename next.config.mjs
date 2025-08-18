import createNextIntlPlugin from "next-intl/plugin";
import withPWAInit from "next-pwa";

// إعداد next-intl
const withNextIntl = createNextIntlPlugin();

// إعداد PWA
const withPWA = withPWAInit({
  dest: "public", // مكان توليد service worker
  register: true, // يسجل تلقائيًا
  skipWaiting: true, // يفعّل أي تحديث فورًا
  disable: process.env.NODE_ENV === "development", // معطل أثناء التطوير
  buildExcludes: [/app-build-manifest\.json$/],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "cdn.salla.sa" },
    ],
  },
  // أي إعدادات إضافية هنا
};

// نلف PWA أولًا ثم Intl
export default withNextIntl(withPWA(nextConfig));
