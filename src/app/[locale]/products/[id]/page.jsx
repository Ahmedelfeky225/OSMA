// app/products/[id]/page.jsx
import ProductDetails from "@/components/productDetails";
import { fetchInterceptor } from "@/utils/fetchInterceptor";

const ProductPage = async (props) => {
  const { params } = props;
  const product = await fetchInterceptor(`products/${params.id}`);
  // console.log("product", params.id);

  if (!product) return <div>Product not found</div>;

  return <ProductDetails product={product} />;
};

export default ProductPage;
