// // import { cookies } from "next/headers";
// // import { getLocale } from "next-intl/server";

// // export const fetchInterceptor = async (url, options = {}) => {
// //   const locale = await getLocale();
// //   const cookieStore = await cookies();
// //   const tokenCookie = cookieStore.get("token");

// //   let baseURL = `${process.env.NEXT_APP_BASE_URL}/${url}?locale=${locale}`;

// //   if (options?.params) {
// //     const params = new URLSearchParams(options.params).toString();
// //     baseURL = `${process.env.NEXT_APP_BASE_URL}/${url}?${params}&locale=${locale}`;
// //   }

// //   const modifiedOptions = {
// //     ...options,
// //     headers: {
// //       ...(options.headers || {}),
// //       "Content-Type": "application/json",
// //       appId: process.env.NEXT_PUBLIC_APPID,
// //       // Cookie: `token=${tokenCookie?.value || ""}`,
// //     },
// //     cache: "no-store",
// //   };

// //   try {
// //     const response = await fetch(baseURL, modifiedOptions);
// //     const data = await response.json();

// //     if (!response.ok) return null;
// //     return data;
// //   } catch (error) {
// //     console.error("❌ Fetch Interceptor Error:", error.message);
// //     return null;
// //   }
// // };

// export const fetchInterceptor = async (url, options = {}) => {
//   const locale =
//     typeof window !== "undefined"
//       ? document.documentElement.lang || "en"
//       : "en";

//   let baseURL = `${process.env.NEXT_PUBLIC_API_URL}/${url}?locale=${locale}`;

//   if (options?.params) {
//     const params = new URLSearchParams(options.params).toString();
//     baseURL = `${process.env.NEXT_PUBLIC_API_URL}/${url}?${params}&locale=${locale}`;
//   }

//   const modifiedOptions = {
//     ...options,
//     headers: {
//       ...(options.headers || {}),
//       "Content-Type": "application/json",
//       appId: process.env.NEXT_PUBLIC_APPID,
//     },
//     credentials: "include", // 👈 مهم جداً عشان الكوكي يتبعت
//     cache: "no-store",
//   };

//   try {
//     const response = await fetch(baseURL, modifiedOptions);
//     if (!response.ok) return null;
//     return await response.json();
//   } catch (error) {
//     console.error("❌ Fetch Interceptor Error:", error.message);
//     return null;
//   }
// };

export const fetchInterceptor = async (path, options = {}) => {
  const isBrowser = typeof window !== "undefined";

  // استنتاج الـ locale ببساطة؛ مرّره بنفسك لو عندك من الراوت
  const locale = isBrowser ? document.documentElement.lang || "en" : "en";

  const base = process.env.NEXT_PUBLIC_API_URL; // لازم يكون https في البرودكشن
  if (!base) {
    console.error("❌ NEXT_PUBLIC_API_URL is not defined");
    return null;
  }

  // بناء URL آمن
  const baseNormalized = base.endsWith("/") ? base : base + "/";
  const url = new URL(path, baseNormalized);

  // أضف params إن وُجدت
  if (options.params && typeof options.params === "object") {
    for (const [k, v] of Object.entries(options.params)) {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
    }
  }

  // أضف الـ locale
  if (!url.searchParams.has("locale")) {
    url.searchParams.set("locale", locale);
  }

  // إعدادات الطلب
  const init = { ...options };
  delete init.params;

  // هيدرز: بلاش Content-Type على GET/HEAD لتقليل الـ preflight
  const method = (init.method || "GET").toUpperCase();
  const baseHeaders = {
    ...(init.headers || {}),
    appId: process.env.NEXT_PUBLIC_APPID,
  };
  if (!["GET", "HEAD"].includes(method)) {
    baseHeaders["Content-Type"] =
      baseHeaders["Content-Type"] || "application/json";
  }
  init.headers = baseHeaders;

  // الكاش
  init.cache = init.cache || "no-store";

  // في المتصفح: لازم include
  if (isBrowser) {
    init.credentials = "include";
  } else {
    // في SSR: مرّر كوكي الطلب الحالي لو مش متبعت من النداء
    if (!("Cookie" in baseHeaders)) {
      try {
        const { cookies } = await import("next/headers");
        const store = await cookies();
        const cookieHeader = store
          .getAll()
          .map((c) => `${c.name}=${c.value}`)
          .join("; ");
        if (cookieHeader) {
          init.headers = { ...init.headers, Cookie: cookieHeader };
        }
      } catch {
        // سيرفر مش Next: تجاهل
      }
    }
  }

  try {
    const res = await fetch(url.toString(), init);
    if (!res.ok) {
      // هيساعدك في الديباج على البرودكشن
      const text = await res.text().catch(() => "");
      console.error(
        "❌ fetchInterceptor failed:",
        res.status,
        url.toString(),
        text.slice(0, 200)
      );
      return null;
    }
    return await res.json().catch(() => null);
  } catch (err) {
    console.error(
      "❌ Fetch Interceptor Error:",
      err?.message || err,
      url.toString()
    );
    return null;
  }
};
