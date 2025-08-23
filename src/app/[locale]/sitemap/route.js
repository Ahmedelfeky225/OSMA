// /app/[locale]/sitemap/route.js
import slugify from "slugify";

const BASE_URL = "https://osma-perfume.vercel.app"; // روابط الموقع النهائية

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

  // ---- جلب المنتجات من الـ backend مع header ----
  const BACKEND_URL = "https://osma-backend-1.onrender.com/api";
  let products = [];
  try {
    const res = await fetch(`${BACKEND_URL}/products?locale=${locale}`, {
      headers: {
        appId: process.env.NEXT_PUBLIC_APPID,
      },
    });
    const data = await res.json();

    if (data.products && Array.isArray(data.products)) {
      products = data.products.map((product) => {
        // لو ما فيش slug، نولّد واحد من الاسم
        let productSlug = product.slug;
        if (!productSlug) {
          const name = product.translations?.[locale]?.name || "product";
          productSlug = slugify(name, { lower: true, strict: true });
        }

        return {
          path: `/products/${productSlug}`,
          changefreq: "weekly",
          priority: 0.7,
          lastmod: product.updatedAt || product.createdAt,
        };
      });
    }
  } catch (err) {
    console.error("Error fetching products for sitemap:", err);
  }

  // دمج كل الروابط
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
      <lastmod>${
        page.lastmod
          ? new Date(page.lastmod).toISOString()
          : new Date().toISOString()
      }</lastmod>
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
