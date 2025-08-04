/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // ← استخدام الوضع الداكن من خلال class (مثل: <html class="dark">)
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)", // ← تعريف اللون الأساسي باستخدام CSS variable
        textColor: "var(--text-color)", // ← للكتابة
        background: "var(--background-color)", // ← للخلفية
        card: "var(--card-color)", // ← للبطاقات
      },
    },
  },
  plugins: [],
};
