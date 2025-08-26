// // // // app/products/[id]/page.jsx
// // // import ProductDetails from "@/components/productDetails";
// // // import { fetchInterceptor } from "@/utils/fetchInterceptor";

// // // const ProductPage = async (props) => {
// // //   const { params } = props;
// // //   const product = await fetchInterceptor(`products/${params.id}`);
// // //   // console.log("product", params.id);

// // //   if (!product) return <div>Product not found</div>;

// // //   return <ProductDetails product={product} />;
// // // };

// // // export default ProductPage;

// // import ProductDetails from "@/components/productDetails";
// // import { fetchInterceptor } from "@/utils/fetchInterceptor";

// // // جلب بيانات المنتج
// // async function getProduct(id) {
// //   return await fetchInterceptor(`products/${id}`);
// // }

// // // Metadata ديناميكي
// // export async function generateMetadata({ params }) {
// //   const product = await getProduct(params.id);

// //   const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;
// //   const faviconUrl = "/favicon.ico";

// //   if (!product) {
// //     return {
// //       title: "Product Not Found",
// //       description: "This product does not exist",
// //       icons: { icon: faviconUrl },
// //     };
// //   }

// //   return {
// //     title: product.translations?.en?.name || "Product Details",
// //     description:
// //       product.translations?.en?.description || "View product details",
// //     icons: { icon: faviconUrl },
// //     openGraph: {
// //       title: product.translations?.en?.name,
// //       description: product.translations?.en?.description,
// //       url: `${baseUrl}/products/${product._id}`,
// //       images: [
// //         {
// //           url: product.images?.[0],
// //           alt: product.translations?.en?.name,
// //         },
// //       ],
// //     },
// //     twitter: {
// //       card: "summary_large_image",
// //       title: product.translations?.en?.name,
// //       description: product.translations?.en?.description,
// //       images: [product.images?.[0]],
// //     },
// //   };
// // }

// // const ProductPage = async ({ params }) => {
// //   const product = await getProduct(params.id);

// //   if (!product) return <div>Product not found</div>;

// //   return <ProductDetails product={product} />;
// // };

// // export default ProductPage;

// import ProductDetails from "@/components/productDetails";
// import { fetchInterceptor } from "@/utils/fetchInterceptor";

// // جلب بيانات المنتج بالـ ID
// async function getProduct(id) {
//   try {
//     const product = await fetchInterceptor(`products/${id}`);
//     return product || null;
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     return null;
//   }
// }

// // Metadata ديناميكي
// export async function generateMetadata({ params }) {
//   if (!params.slugId) {
//     return {
//       title: "Invalid URL",
//       description: "The product URL is invalid.",
//       icons: { icon: "/favicon.ico" },
//     };
//   }

//   const parts = params.slugId.split("-");
//   const id = parts[parts.length - 1];

//   const product = await getProduct(id);

//   const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;
//   const faviconUrl = "/favicon.ico";

//   if (!product) {
//     return {
//       title: "Product Not Found",
//       description: "This product does not exist",
//       icons: { icon: faviconUrl },
//     };
//   }

//   const name = product?.translations?.en?.name || "Product Details";
//   const description =
//     product?.translations?.en?.description || "View product details";

//   return {
//     title: name,
//     description,
//     icons: { icon: faviconUrl },
//     openGraph: {
//       title: name,
//       description,
//       url: `${baseUrl}/products/${name}-${product._id}`,
//       images: [
//         {
//           url: product.images?.[0],
//           alt: name,
//         },
//       ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: name,
//       description,
//       images: [product.images?.[0]],
//     },
//   };
// }

// const ProductPage = async ({ params }) => {
//   // console.log("PARAMS:", params);

//   if (!params.slugId) return <div>Invalid URL</div>;

//   const parts = params.slugId.split("-");
//   const id = parts[parts.length - 1];

//   const product = await getProduct(id);

//   if (!product) return <div>Product not found</div>;

//   return <ProductDetails product={product} />;
// };

// export default ProductPage;

import ProductDetails from "@/components/productDetails";
import { fetchInterceptor } from "@/utils/fetchInterceptor";
import {
  generateProductMetadata,
  generateProductStructuredData,
  generateBreadcrumbsStructuredData,
} from "@/utils/seo-utils";

const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;

// ✅ جلب بيانات المنتج باستخدام ID
async function getProduct(id) {
  try {
    const product = await fetchInterceptor(`products/${id}`);
    return product || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// ✅ Metadata ديناميكي يدعم اللغتين
export async function generateMetadata({ params }) {
  if (!params.slugId) {
    return {
      title: "Invalid URL",
      description: "The product URL is invalid.",
      icons: { icon: "/favicon.ico" },
    };
  }

  const parts = params.slugId.split("-");
  const id = parts[parts.length - 1];

  const product = await getProduct(id);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "This product does not exist",
      icons: { icon: "/favicon.ico" },
    };
  }

  // ✅ تحديد اللغة الأساسية (بناءً على المسار)
  const currentLocale = params.locale === "en" ? "en" : "ar";

  const metadata = generateProductMetadata(product, id, currentLocale);

  // ✅ إضافة hreflang والـ alternates
  metadata.alternates = {
    canonical: `${baseUrl}/${currentLocale}/products/${params.slugId}`,
    languages: {
      "ar-SA": `${baseUrl}/ar/products/${params.slugId}`,
      "en-US": `${baseUrl}/en/products/${params.slugId}`,
    },
  };

  return metadata;
}

// ✅ صفحة المنتج
const ProductPage = async ({ params }) => {
  if (!params.slugId) return <div>Invalid URL</div>;

  const parts = params.slugId.split("-");
  const id = parts[parts.length - 1];

  const product = await getProduct(id);

  if (!product) return <div>Product not found</div>;

  const currentLocale = params.locale === "en" ? "en" : "ar";

  const structuredData = generateProductStructuredData(
    product,
    id,
    currentLocale
  );
  const breadcrumbsData = generateBreadcrumbsStructuredData(
    id,
    product.translations[currentLocale]?.name,
    currentLocale
  );

  return (
    <>
      {/* ✅ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsData) }}
      />

      <ProductDetails product={product} locale={currentLocale} />
    </>
  );
};

export default ProductPage;
