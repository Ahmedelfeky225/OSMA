// /app/[locale]/sitemap/route.js
const BASE_URL = "https://osma-perfume.vercel.app";

export async function GET({ params }) {
  const locale = params?.locale || "en";
  const locales = ["en", "ar"];

  if (!locales.includes(locale)) {
    return new Response("Locale not supported", { status: 404 });
  }

  // الصفحات الثابتة
  const staticPages = [
    { path: "/about-us", changefreq: "monthly", priority: 0.8 },
  ];

  // الصفحات الديناميكية
  const dynamicPages = [
    { path: "", changefreq: "daily", priority: 1.0 }, // Home
    { path: "/offers", changefreq: "daily", priority: 1.0 },
    { path: "/products", changefreq: "daily", priority: 1.0 },
  ];

  // Categories
  const categories = [
    { path: "/categories/men", changefreq: "weekly", priority: 0.9 },
    { path: "/categories/women", changefreq: "weekly", priority: 0.9 },
    { path: "/categories/unisex", changefreq: "weekly", priority: 0.9 },
    { path: "/categories/hair-perfumes", changefreq: "weekly", priority: 0.9 },
    { path: "/categories/body-sprays", changefreq: "weekly", priority: 0.9 },
    { path: "/categories/air-fresheners", changefreq: "weekly", priority: 0.9 },
  ];

  // صفحات المنتجات الفردية (اضفهم لو عندك قاعدة بيانات)
  const products = []; // مثال: [{ path: "/products/rose-perfume", changefreq: "weekly", priority: 0.7 }]

  // دمج كل الروابط في مصفوفة واحدة
  const allPages = [
    ...staticPages,
    ...dynamicPages,
    ...categories,
    ...products,
  ];

  const urls = allPages.map(
    (page) => `
    <url>
      <loc>${BASE_URL}/${locale}${page.path}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
    </url>`
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.join("")}
  </urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: { "Content-Type": "application/xml" },
  });
}
