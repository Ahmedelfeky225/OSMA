import { fetchInterceptor } from "@/utils/serverFetchInterceptor";

export async function GET() {
  try {
    console.log("🔥 Loading suggestions from /products endpoint...");

    // ✅ جلب المنتجات من products endpoint بدون search
    const productsResponse = await fetchInterceptor("products", {
      params: {
        limit: 8,
      },
    }).catch((err) => {
      console.error("Products API error:", err);
      return null;
    });

    console.log("📊 Products Response for suggestions:", productsResponse);

    let topProducts = [];
    let trending = [];

    if (productsResponse) {
      let products = [];

      // استخراج البيانات حسب structure الـ API
      if (
        productsResponse.products &&
        Array.isArray(productsResponse.products)
      ) {
        products = productsResponse.products;
      } else if (Array.isArray(productsResponse)) {
        products = productsResponse;
      } else if (
        productsResponse.data &&
        Array.isArray(productsResponse.data)
      ) {
        products = productsResponse.data;
      }

      // أخذ أسماء المنتجات كاقتراحات
      topProducts = products
        .slice(0, 4)
        .map((product) => product.name || product.title || "")
        .filter(Boolean);

      // استخدام أسماء المنتجات الأخرى كـ trending
      trending = products
        .slice(4, 8)
        .map((product) => {
          const name = product.name || product.title || "";
          const firstWord = name.split(" ")[0];
          return firstWord && firstWord.length > 2 ? firstWord : name;
        })
        .filter(Boolean);
    }

    const result = {
      topProducts: topProducts,
      trending: trending,
      success: true,
    };

    console.log("✅ Final suggestions result:", result);
    return Response.json(result);
  } catch (error) {
    console.error("❌ Suggestions API Error:", error);

    return Response.json({
      topProducts: [],
      trending: [],
      success: false,
      error: error.message,
    });
  }
}
