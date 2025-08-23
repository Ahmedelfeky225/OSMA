// // app/products/[id]/page.jsx
// import ProductDetails from "@/components/productDetails";
// import { fetchInterceptor } from "@/utils/fetchInterceptor";

// const ProductPage = async (props) => {
//   const { params } = props;
//   const product = await fetchInterceptor(`products/${params.id}`);
//   // console.log("product", params.id);

//   if (!product) return <div>Product not found</div>;

//   return <ProductDetails product={product} />;
// };

// export default ProductPage;

import ProductDetails from "@/components/productDetails";
import { fetchInterceptor } from "@/utils/fetchInterceptor";

// جلب بيانات المنتج
async function getProduct(id) {
  return await fetchInterceptor(`products/${id}`);
}

// Metadata ديناميكي
export async function generateMetadata({ params }) {
  const product = await getProduct(params.id);

  const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;
  const faviconUrl = "/favicon.ico";

  if (!product) {
    return {
      title: "Product Not Found",
      description: "This product does not exist",
      icons: { icon: faviconUrl },
    };
  }

  return {
    title: product.translations?.en?.name || "Product Details",
    description:
      product.translations?.en?.description || "View product details",
    icons: { icon: faviconUrl },
    openGraph: {
      title: product.translations?.en?.name,
      description: product.translations?.en?.description,
      url: `${baseUrl}/products/${product._id}`,
      images: [
        {
          url: product.images?.[0],
          alt: product.translations?.en?.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.translations?.en?.name,
      description: product.translations?.en?.description,
      images: [product.images?.[0]],
    },
  };
}

const ProductPage = async ({ params }) => {
  const product = await getProduct(params.id);

  if (!product) return <div>Product not found</div>;

  return <ProductDetails product={product} />;
};

export default ProductPage;
