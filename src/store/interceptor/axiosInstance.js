import axios from "axios";
import Cookies from "js-cookie"; // ✅ استيراد مكتبة js-cookie

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
    AppId: process.env.NEXT_PUBLIC_APPID,
  },
  // ✅ تم إزالة withCredentials: true
});

// ✅ إضافة Interceptor لضبط الـ Authorization header تلقائيًا
axiosInstance.interceptors.request.use(
  (config) => {
    // ✅ قراءة التوكن من الكوكي التي تم إعدادها في الـ authSlice
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
