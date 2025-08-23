// /app/sitemap/route.js

const BASE_URL = "https://osma-perfume.vercel.app";

export async function GET() {
  // اللغات المدعومة من next-intl
  const locales = ["en", "ar"]; // إنجليزي وعربي

  // الصفحات الثابتة
  const staticPages = ["/about-us"];

  // الصفحات الديناميكية (تحتوي على منتجات)
  const dynamicPages = [
    "", // Home
    "/offers",
    "/products",
  ];

  // فئات المنتجات
  const categories = [
    "/categories/men",
    "/categories/women",
    "/categories/unisex",
    "/categories/hair-perfumes",
    "/categories/body-sprays",
    "/categories/air-fresheners",
  ];

  // صفحات المنتجات الفردية (لو عايز تضيفها من قاعدة بيانات)
  const products = []; // مثال: ["/products/rose-perfume", "/products/jasmine-perfume"]

  let urls = [];

  // إنشاء روابط لكل صفحة بكل لغة
  for (const locale of locales) {
    // الصفحات الثابتة
    for (const page of staticPages) {
      urls.push(`
        <url>
          <loc>${BASE_URL}/${locale}${page}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.8</priority>
        </url>
      `);
    }

    // الصفحات الديناميكية (Home, Offers, Products)
    for (const page of dynamicPages) {
      urls.push(`
        <url>
          <loc>${BASE_URL}/${locale}${page}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>1.0</priority>
        </url>
      `);
    }

    // فئات المنتجات
    for (const category of categories) {
      urls.push(`
        <url>
          <loc>${BASE_URL}/${locale}${category}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.9</priority>
        </url>
      `);
    }

    // صفحات المنتجات الفردية
    for (const product of products) {
      urls.push(`
        <url>
          <loc>${BASE_URL}/${locale}${product}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
      `);
    }
  }

  // إنشاء ملف Sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.join("")}
    </urlset>
  `;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
