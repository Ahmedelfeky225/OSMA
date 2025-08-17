// // import axios from "axios";

// // const axiosInstance = axios.create({
// //   baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
// //   headers: {
// //     "Content-Type": "application/json",
// //     AppId: process.env.NEXT_PUBLIC_APPID,
// //   },
// //   withCredentials: true,
// // });

// // // Optional: Add interceptors if needed
// // // axiosInstance.interceptors...

// // export default axiosInstance;

// import axios from "axios";
// import Cookies from "js-cookie"; // ✅ استيراد مكتبة js-cookie

// const axiosInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
//   headers: {
//     "Content-Type": "application/json",
//     AppId: process.env.NEXT_PUBLIC_APPID,
//   },
//   // ✅ تم إزالة withCredentials: true
// });

// // ✅ إضافة Interceptor لضبط الـ Authorization header تلقائيًا
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // ✅ قراءة التوكن من الكوكي التي تم إعدادها في الـ authSlice
//     const token = Cookies.get("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
    AppId: process.env.NEXT_PUBLIC_APPID,
  },
  // ✅ مع تفعيل هذه الخاصية، المتصفح سيرسل الكوكي تلقائيًا مع كل طلب
  withCredentials: true,
});

// ✅ قم بإزالة الجزء الخاص بإضافة الـ Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    // يمكنك الاحتفاظ بهذا الـ console.log لأغراض Debugging فقط،
    // لكن لا يجب عليك إضافة الـ header هنا
    const cookieToken = Cookies.get("token");
    const localToken = localStorage.getItem("token");
    const token = cookieToken || localToken;
    console.log("[v0] axiosInstance - Token check (in interceptor):", {
      cookieToken: cookieToken ? "exists" : "null",
      localToken: localToken ? "exists" : "null",
      finalToken: token ? "exists" : "null",
      url: config.url,
    });

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("[v0] axiosInstance - Response error:", {
      status: error.response?.status,
      message: error.response?.data?.message,
      url: error.config?.url,
    });

    if (error.response?.status === 401) {
      console.log("[v0] axiosInstance - 401 error, clearing tokens");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      Cookies.remove("token");
      Cookies.remove("user");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
