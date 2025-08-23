export function generatePageMeta(locale, translations, pageKey) {
  const t = translations[locale]?.[pageKey] || {};

  return {
    title: t.metaTitle || t.title || "OSMA",
    description: t.metaDescription || t.description || "OSMA Perfume",
    openGraph: {
      title: t.metaTitle || t.title || "OSMA",
      description: t.metaDescription || t.description || "OSMA Perfume",
      url: t.metaUrl || "https://osma.vercel.app", // هنا الرابط الصحيح
      siteName: "OSMA",
      images: t.metaImage
        ? [
            {
              url: t.metaImage,
              width: 1200,
              height: 630,
              alt: t.metaTitle || "OSMA",
            },
          ]
        : [],
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.metaTitle || t.title || "OSMA",
      description: t.metaDescription || t.description || "OSMA Perfume",
      images: t.metaImage ? [t.metaImage] : [],
    },
  };
}
