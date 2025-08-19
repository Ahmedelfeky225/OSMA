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
//       // Cookie: `token=${tokenCookie?.value || ""}`, // ✅ تم إلغاء التعليق
//       Authorization: tokenCookie ? `Bearer ${tokenCookie.value}` : "",
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

import { cookies } from "next/headers";
import { getLocale } from "next-intl/server";

export const fetchInterceptor = async (url, options = {}) => {
  const locale = await getLocale();
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("token");

  let baseURL = `${process.env.NEXT_APP_BASE_URL}/${url}?locale=${locale}`;

  if (options?.params) {
    const params = new URLSearchParams(options.params).toString();
    baseURL = `${process.env.NEXT_APP_BASE_URL}/${url}?${params}&locale=${locale}`;
  }

  const modifiedOptions = {
    ...options,
    headers: {
      ...(options.headers || {}),
      "Content-Type": "application/json",
      appId: process.env.NEXT_PUBLIC_APPID,
      // ارسال التوكن في الـ Authorization header
      Authorization: tokenCookie ? `Bearer ${tokenCookie.value}` : "",
    },
    cache: "no-store",
  };

  try {
    const response = await fetch(baseURL, modifiedOptions);
    const data = await response.json();

    if (!response.ok) return null;
    return data;
  } catch (error) {
    console.error("❌ Fetch Interceptor Error:", error.message);
    return null;
  }
};
