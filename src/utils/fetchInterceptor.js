// import { cookies } from "next/headers";
// import { getLocale } from "next-intl/server";

// export const fetchInterceptor = async (url, options = {}) => {
//   const locale = await getLocale();
//   const cookieStore = await cookies();
//   const tokenCookie = cookieStore.get("token");

//   let baseURL = `${process.env.NEXT_APP_BASE_URL}/${url}?locale=${locale}`;

//   if (options?.params) {
//     const params = new URLSearchParams(options.params).toString();
//     baseURL = `${process.env.NEXT_APP_BASE_URL}/${url}?${params}&locale=${locale}`;
//   }

//   const modifiedOptions = {
//     ...options,
//     headers: {
//       ...(options.headers || {}),
//       "Content-Type": "application/json",
//       appId: process.env.NEXT_PUBLIC_APPID,
//       // Cookie: `token=${tokenCookie?.value || ""}`,
//     },
//     cache: "no-store",
//   };

//   try {
//     const response = await fetch(baseURL, modifiedOptions);
//     const data = await response.json();

//     if (!response.ok) return null;
//     return data;
//   } catch (error) {
//     console.error("❌ Fetch Interceptor Error:", error.message);
//     return null;
//   }
// };

export const fetchInterceptor = async (url, options = {}) => {
  const locale =
    typeof window !== "undefined"
      ? document.documentElement.lang || "en"
      : "en";

  let baseURL = `${process.env.NEXT_PUBLIC_API_URL}/${url}?locale=${locale}`;

  if (options?.params) {
    const params = new URLSearchParams(options.params).toString();
    baseURL = `${process.env.NEXT_PUBLIC_API_URL}/${url}?${params}&locale=${locale}`;
  }

  const modifiedOptions = {
    ...options,
    headers: {
      ...(options.headers || {}),
      "Content-Type": "application/json",
      appId: process.env.NEXT_PUBLIC_APPID,
    },
    credentials: "include", // 👈 مهم جداً عشان الكوكي يتبعت
    cache: "no-store",
  };

  try {
    const response = await fetch(baseURL, modifiedOptions);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("❌ Fetch Interceptor Error:", error.message);
    return null;
  }
};
