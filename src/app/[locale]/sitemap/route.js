export async function GET({ params }) {
  const locale = params?.locale || "en";
  const locales = ["en", "ar"];
  if (!locales.includes(locale))
    return new Response("Locale not supported", { status: 404 });

  const BASE_URL = "https://osma-perfume.vercel.app";
  const staticPages = ["/about-us"];
  const dynamicPages = ["", "/offers", "/products"];
  const categories = [
    "/categories/men",
    "/categories/women",
    "/categories/unisex",
    "/categories/hair-perfumes",
    "/categories/body-sprays",
    "/categories/air-fresheners",
  ];

  const urls = [...staticPages, ...dynamicPages, ...categories].map(
    (page) => `
    <url>
      <loc>${BASE_URL}/${locale}${page}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.join("")}
    </urlset>`;

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
}
