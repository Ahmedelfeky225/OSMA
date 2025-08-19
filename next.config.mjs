// import createNextIntlPlugin from "next-intl/plugin";

// // إعداد next-intl
// const withNextIntl = createNextIntlPlugin();

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     remotePatterns: [
//       { protocol: "https", hostname: "res.cloudinary.com" },
//       { protocol: "https", hostname: "cdn.salla.sa" },
//     ],
//   },
//   // أي إعدادات إضافية هنا
// };

// // نستخدم next-intl فقط
// export default withNextIntl(nextConfig);
import createNextIntlPlugin from "next-intl/plugin";
import withPWA from "next-pwa";

const nextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "cdn.salla.sa" },
    ],
  },
};

// دمج next-intl و PWA
export default nextIntl(
  withPWA({
    ...nextConfig,
    pwa: {
      dest: "public", // مكان تخزين ملفات SW
      register: true, // تسجيل SW تلقائي
      skipWaiting: true, // SW يشتغل فورًا بدون انتظار
      disable: process.env.NODE_ENV === "development", // تعطيل في الـ dev
    },
  })
);
