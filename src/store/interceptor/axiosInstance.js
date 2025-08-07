import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
    AppId: process.env.NEXT_PUBLIC_APPID,
  },
  withCredentials: true,
});

// Optional: Add interceptors if needed
// axiosInstance.interceptors...

export default axiosInstance;
