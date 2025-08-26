// utils/seo-utils.js

export function generateProductMetadata(product, productId, locale = "ar") {
  if (!product) {
    return {
      title: locale === "en" ? "Product Not Found" : "المنتج غير موجود",
      description:
        locale === "en"
          ? "The requested product could not be found."
          : "المنتج المطلوب غير موجود.",
    };
  }

  const translations = product.translations || {};
  const name =
    translations[locale]?.name ||
    translations.en?.name ||
    translations.ar?.name ||
    (locale === "en" ? "Product" : "منتج");
  const description =
    translations[locale]?.description ||
    translations.en?.description ||
    translations.ar?.description ||
    (locale === "en" ? "Premium product" : "منتج فاخر");
  const image = product.images?.[0] || "/diverse-products-still-life.png";

  const discountText =
    product.discount > 0
      ? locale === "en"
        ? `Discount ${product.discount}% - `
        : `خصم ${product.discount}% - `
      : "";
  const stockText =
    product.stock > 0
      ? locale === "en"
        ? "Available now"
        : "متوفر الآن"
      : locale === "en"
      ? "Out of stock"
      : "غير متوفر";

  return {
    title: `${discountText}${name} - ${product.brand} | ${
      locale === "en" ? "Luxury Perfume Store" : "متجر العطور الفاخرة"
    }`,
    description: `${description} - ${product.brand} ${product.size}. ${
      product.discount > 0
        ? locale === "en"
          ? `Special Offer: ${product.discount}% OFF!`
          : `عرض خاص: خصم ${product.discount}%!`
        : ""
    } ${stockText}.`,
    keywords: [
      name,
      product.brand,
      locale === "en" ? "perfume" : "عطر",
      locale === "en" ? "fragrance" : "عطور",
      "luxury",
      ...(product.notes?.top || []),
      ...(product.notes?.heart || []),
      ...(product.notes?.base || []),
    ].join(", "),
    openGraph: {
      title: `${name} - ${product.brand}`,
      description: description,
      images: [
        {
          url: image,
          width: 800,
          height: 600,
          alt: name,
        },
      ],
      type: "product",
      siteName:
        locale === "en" ? "Luxury Perfume Store" : "متجر العطور الفاخرة",
      locale: locale === "en" ? "en_US" : "ar_SA",
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} - ${product.brand}`,
      description: description,
      images: [image],
    },
    robots: {
      index: product.stock > 0,
      follow: true,
      googleBot: {
        index: product.stock > 0,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `/product/${productId}`,
      languages: {
        "ar-SA": `/ar/product/${productId}`,
        "en-US": `/en/product/${productId}`,
      },
    },
    other: {
      "product:price:amount": product.finalPrice || product.price,
      "product:price:currency": "OMR",
      "product:availability": product.stock > 0 ? "in stock" : "out of stock",
      "product:brand": product.brand,
      "product:condition": "new",
      "product:retailer_item_id": productId,
    },
  };
}

export function generateProductStructuredData(
  product,
  productId,
  locale = "ar"
) {
  const translations = product.translations || {};
  const name =
    translations[locale]?.name ||
    translations.en?.name ||
    translations.ar?.name;
  const description =
    translations[locale]?.description ||
    translations.en?.description ||
    translations.ar?.description;

  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    name,
    description,
    image: product.images,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    offers: {
      "@type": "Offer",
      price: product.finalPrice || product.price,
      priceCurrency: "OMR",
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      seller: {
        "@type": "Organization",
        name: locale === "en" ? "Luxury Perfume Store" : "متجر العطور الفاخرة",
        url: "https://osma-perfume.vercel.app",
        address: {
          "@type": "PostalAddress",
          addressLocality: "مسقط",
          addressCountry: "سلطنة عمان",
        },
        telephone: "+968-7711-7906",
      },
    },
    aggregateRating:
      product.numReviews > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: product.averageRating,
            reviewCount: product.numReviews,
            bestRating: 5,
            worstRating: 1,
          }
        : undefined,
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: locale === "en" ? "Size" : "الحجم",
        value: product.size,
      },
      {
        "@type": "PropertyValue",
        name: locale === "en" ? "Top Notes" : "النفحات العلوية",
        value: product.notes.top.join(", "),
      },
      {
        "@type": "PropertyValue",
        name: locale === "en" ? "Heart Notes" : "نفحات القلب",
        value: product.notes.heart.join(", "),
      },
      {
        "@type": "PropertyValue",
        name: locale === "en" ? "Base Notes" : "النفحات الأساسية",
        value: product.notes.base.join(", "),
      },
    ],
    category: "Beauty & Personal Care > Fragrances",
    gtin: product.gtin || undefined,
    mpn: product.mpn || product._id,
    sku: product.sku || product._id,
  };
}

export function generateBreadcrumbsStructuredData(
  productId,
  productName,
  locale = "ar"
) {
  const baseUrl = "https://osma-perfume.vercel.app";
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "en" ? "Home" : "الرئيسية",
        item: `${baseUrl}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "en" ? "Products" : "المنتجات",
        item: `${baseUrl}/${locale}/products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: productName,
        item: `${baseUrl}/${locale}/products/${productId}`,
      },
    ],
  };
}
