import { fetchInterceptor } from "@/utils/serverFetchInterceptor";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const limit = searchParams.get("limit") || 10;
  const suggestions = searchParams.get("suggestions") === "true";

  try {
    // console.log(
    //   `🔍 Products API - Search: "${search}", Limit: ${limit}, Suggestions: ${suggestions}`
    // );

    // استدعاء الـ products endpoint
    const data = await fetchInterceptor("products", {
      params: {
        ...(search && { search }),
        limit,
      },
    });

    // console.log("📦 Products API Response:", data);

    // معالجة البيانات المرجعة
    let products = [];
    let total = 0;

    if (data && data.products && Array.isArray(data.products)) {
      products = data.products.map((product) => ({
        id: product._id,
        name:
          product.translations?.ar?.name ||
          product.translations?.en?.name ||
          "",
        nameEn: product.translations?.en?.name || "",
        nameAr: product.translations?.ar?.name || "",
        price: product.finalPrice || product.price || 0,
        currency: "ريال",
        image:
          product.images && product.images.length > 0
            ? product.images[0]
            : null,
        brand: product.brand || "",
        category: product.category || "",
        stock: product.stock || 0,
        rating: product.averageRating || 0,
        reviews: product.numReviews || 0,
        discount: product.discount || 0,
        size: product.size || "",
        concentration: product.concentration || "",
        isFeatured: product.isFeatured || false,
      }));
      total = data.total || data.products.length;
    } else if (data && Array.isArray(data)) {
      products = data.map((product) => ({
        id: product._id,
        name:
          product.translations?.ar?.name ||
          product.translations?.en?.name ||
          "",
        nameEn: product.translations?.en?.name || "",
        nameAr: product.translations?.ar?.name || "",
        price: product.finalPrice || product.price || 0,
        currency: "ريال",
        image:
          product.images && product.images.length > 0
            ? product.images[0]
            : null,
        brand: product.brand || "",
        category: product.category || "",
        stock: product.stock || 0,
        rating: product.averageRating || 0,
        reviews: product.numReviews || 0,
        discount: product.discount || 0,
        size: product.size || "",
        concentration: product.concentration || "",
        isFeatured: product.isFeatured || false,
      }));
      total = data.length;
    }

    // إذا كان الطلب للاقتراحات، نرجع بيانات مختلفة
    if (suggestions) {
      const featuredProducts = products
        .filter((p) => p.isFeatured && p.name)
        .slice(0, 4);
      const brands = [
        ...new Set(products.map((p) => p.brand).filter(Boolean)),
      ].slice(0, 6);

      return Response.json({
        topProducts: featuredProducts.map((p) => ({
          id: p.id,
          nameAr: p.nameAr,
          nameEn: p.nameEn,
          image: p.image,
          brand: p.brand,
          price: p.price,
          currency: p.currency,
        })),
        trending: brands,
        success: true,
      });
    }

    return Response.json({
      products: products.filter((p) => p.name), // فلترة المنتجات التي لها أسماء فقط
      total,
      success: true,
      message: products.length === 0 ? "No products found" : undefined,
    });
  } catch (error) {
    // console.error("❌ Products API Error:", error);
    return Response.json(
      {
        error: "Failed to fetch products",
        message: error.message,
        success: false,
      },
      { status: 500 }
    );
  }
}
