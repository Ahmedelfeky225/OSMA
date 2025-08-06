// /src/lib/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`, // عدل حسب رابط API بتاعك
  headers: {
    "Content-Type": "application/json",
    AppId: process.env.NEXT_PUBLIC_APPID,
    Accept: "application/json",
  },
});

// ممكن تضيف interceptors لو حبيت (للتوكن مثلاً)

export default axiosInstance;
