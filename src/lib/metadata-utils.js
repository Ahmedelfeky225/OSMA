// Utility functions for generating dynamic metadata

export function generateProductMetadata(product, productId) {
  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  const productName =
    product.translations.en?.name || product.translations.ar?.name || "Product";
  const productDescription =
    product.translations.en?.description ||
    product.translations.ar?.description ||
    "Premium product";
  const productImage =
    product.images?.[0] || "/diverse-products-still-life.png";

  const discountText =
    product.discount > 0 ? `خصم ${product.discount}% - ` : "";
  const stockText = product.stock > 0 ? "متوفر الآن" : "غير متوفر";

  return {
    title: `${discountText}${productName} - ${product.brand} | متجر العطور الفاخرة`,
    description: `${productDescription} - ${product.brand} ${product.size}. ${
      product.discount > 0 ? `عرض خاص: خصم ${product.discount}%!` : ""
    } ${stockText} وجاهز للشحن.`,
    keywords: [
      productName,
      product.brand,
      "عطر",
      "عطور",
      "فاخر",
      "perfume",
      "fragrance",
      "luxury",
      ...product.notes.top,
      ...product.notes.heart,
      ...product.notes.base,
    ].join(", "),

    // Open Graph metadata for social sharing
    openGraph: {
      title: `${productName} - ${product.brand}`,
      description: productDescription,
      images: [
        {
          url: productImage,
          width: 800,
          height: 600,
          alt: productName,
        },
      ],
      type: "product",
      siteName: "متجر العطور الفاخرة",
      locale: "ar_SA",
    },

    // Twitter Card metadata
    twitter: {
      card: "summary_large_image",
      title: `${productName} - ${product.brand}`,
      description: productDescription,
      images: [productImage],
    },

    // Additional metadata for better SEO
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

    // Canonical URL
    alternates: {
      canonical: `/product/${productId}`,
      languages: {
        "ar-SA": `/ar/product/${productId}`,
        "en-US": `/en/product/${productId}`,
      },
    },

    // Product-specific metadata
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

export function generateProductStructuredData(product) {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.translations.en?.name || product.translations.ar?.name,
    description:
      product.translations.en?.description ||
      product.translations.ar?.description,
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
        .split("T")[0], // 30 days from now
      seller: {
        "@type": "Organization",
        name: "متجر العطور الفاخرة",
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
        name: "الحجم",
        value: product.size,
      },
      {
        "@type": "PropertyValue",
        name: "النفحات العلوية",
        value: product.notes.top.join(", "),
      },
      {
        "@type": "PropertyValue",
        name: "نفحات القلب",
        value: product.notes.heart.join(", "),
      },
      {
        "@type": "PropertyValue",
        name: "النفحات الأساسية",
        value: product.notes.base.join(", "),
      },
    ],
    category: "Beauty & Personal Care > Fragrances",
    gtin: product.gtin || undefined,
    mpn: product.mpn || product._id,
    sku: product.sku || product._id,
  };
}
