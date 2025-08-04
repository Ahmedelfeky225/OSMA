import { fetchInterceptor } from "@/utils/serverFetchInterceptor";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search"); // ✅ نستقبل search مش q
  const limit = searchParams.get("limit") || 6;

  if (!search) {
    return Response.json(
      { error: "Search parameter is required" },
      { status: 400 }
    );
  }

  try {
    console.log(`🔍 Searching for: "${search}" with limit: ${limit}`);

    // ✅ نبعت للـ products endpoint مع search parameter
    const data = await fetchInterceptor("products", {
      params: {
        search: search, // ✅ استخدام search parameter
        limit: limit,
      },
    });

    console.log("📦 API Response:", data);

    // التحقق من البيانات المرجعة
    if (data && data.products && Array.isArray(data.products)) {
      return Response.json({
        products: data.products,
        total: data.total || data.products.length,
        success: true,
      });
    } else if (data && Array.isArray(data)) {
      return Response.json({
        products: data,
        total: data.length,
        success: true,
      });
    } else if (data && data.data && Array.isArray(data.data)) {
      return Response.json({
        products: data.data,
        total: data.total || data.data.length,
        success: true,
      });
    } else {
      console.warn("⚠️ No products found for search:", search);
      console.warn("⚠️ API Response structure:", data);
      return Response.json({
        products: [],
        total: 0,
        success: true,
        message: "No products found",
      });
    }
  } catch (error) {
    console.error("❌ Search API Error:", error);
    return Response.json(
      {
        error: "Search failed",
        message: error.message,
        success: false,
      },
      { status: 500 }
    );
  }
}
