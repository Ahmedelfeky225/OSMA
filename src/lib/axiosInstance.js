// // /src/lib/axiosInstance.js
// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: `${process.env.NEXT_PUBLIC_API_URL}`, // عدل حسب رابط API بتاعك
//   headers: {
//     "Content-Type": "application/json",
//     AppId: process.env.NEXT_PUBLIC_APPID,
//     Accept: "application/json",
//   },
// });

// // ممكن تضيف interceptors لو حبيت (للتوكن مثلاً)

// export default axiosInstance;

// /src/lib/axiosInstance.js
import axios from "axios";
import Cookies from "js-cookie"; // ✅ استيراد مكتبة الكوكيز

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  headers: {
    "Content-Type": "application/json",
    AppId: process.env.NEXT_PUBLIC_APPID,
    Accept: "application/json",
  }, // ✅ إضافة هذه الخاصية لجعل المتصفح يرسل الكوكيز تلقائيًا
  withCredentials: true,
});

// ✅ إضافة Interceptor لإدارة التوكن
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); // جلب التوكن من الكوكي
    if (token) {
      // إضافة التوكن إلى الـ header (هذا كان سبب المشكلة)
      // ولكن في حالتك، لن نستخدمه. سنعتمد فقط على الـ withCredentials.
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ إضافة Interceptor للتحقق من الأخطاء
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // عند حدوث خطأ 401، قم بمسح التوكن
      Cookies.remove("token");
      localStorage.removeItem("token");
      window.location.reload(); // إعادة تحميل الصفحة
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
