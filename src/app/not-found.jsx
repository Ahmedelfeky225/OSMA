// "use client";

// import Link from "next/link";
// import { useLocale } from "next-intl";

// export default function NotFound() {
//   const locale = useLocale();

//   const content = {
//     ar: {
//       title: "الصفحة غير موجودة",
//       description: "عذراً، لا يمكننا العثور على الصفحة التي تبحث عنها",
//       homeButton: "العودة للرئيسية",
//       backButton: "الصفحة السابقة",
//     },
//     en: {
//       title: "Page Not Found",
//       description: "Sorry, we couldn't find the page you're looking for",
//       homeButton: "Back to Home",
//       backButton: "Go Back",
//     },
//   };

//   const currentContent = content[locale] || content.en;

//   return (
//     <div className="min-h-screen bg-white dark:bg-[#1b2535] flex items-center justify-center px-4">
//       <div className="max-w-md w-full text-center">
//         {/* OSMA Brand Logo */}
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold text-[#7a99c0] mb-2">OSMA</h1>
//           <div className="w-16 h-1 bg-[#7a99c0] mx-auto rounded-full"></div>
//         </div>

//         {/* 404 Error */}
//         <div className="mb-8">
//           <h2 className="text-8xl font-bold text-gray-200 dark:text-gray-700 mb-4">
//             404
//           </h2>
//           <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
//             {currentContent.title}
//           </h3>
//           <p className="text-gray-600 dark:text-gray-300 mb-2">
//             {currentContent.description}
//           </p>
//         </div>

//         {/* Action Buttons */}
//         <div className="space-y-4">
//           <Link
//             href="/"
//             className="block w-full bg-[#7a99c0] hover:bg-[#6a89b0] text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
//           >
//             {currentContent.homeButton}
//           </Link>

//           <button
//             onClick={() => window.history.back()}
//             className="block w-full border-2 border-[#7a99c0] text-[#7a99c0] hover:bg-[#7a99c0] hover:text-white font-medium py-3 px-6 rounded-lg transition-all duration-200"
//           >
//             {currentContent.backButton}
//           </button>
//         </div>

//         {/* Decorative Elements */}
//         <div className="mt-8 flex justify-center space-x-2">
//           <div className="w-2 h-2 bg-[#7a99c0] rounded-full animate-pulse"></div>
//           <div
//             className="w-2 h-2 bg-[#7a99c0] rounded-full animate-pulse"
//             style={{ animationDelay: "0.2s" }}
//           ></div>
//           <div
//             className="w-2 h-2 bg-[#7a99c0] rounded-full animate-pulse"
//             style={{ animationDelay: "0.4s" }}
//           ></div>
//         </div>
//       </div>
//     </div>
//   );
// }

import Link from "next/link";

export default function NotFound({ params }) {
  const locale = params?.locale || "en";

  const content = {
    ar: {
      title: "الصفحة غير موجودة",
      description: "عذراً، لا يمكننا العثور على الصفحة التي تبحث عنها",
      homeButton: "العودة للرئيسية",
      backButton: "الرجوع للمنتجات",
    },
    en: {
      title: "Page Not Found",
      description: "Sorry, we couldn't find the page you're looking for",
      homeButton: "Back to Home",
      backButton: "Browse Products",
    },
  };

  const currentContent = content[locale] || content.en;

  return (
    <div className="min-h-screen bg-white dark:bg-[#1b2535] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* OSMA Brand Logo */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#7a99c0] mb-2">OSMA</h1>
          <div className="w-16 h-1 bg-[#7a99c0] mx-auto rounded-full"></div>
        </div>

        {/* 404 Error */}
        <div className="mb-8">
          <h2 className="text-8xl font-bold text-gray-200 dark:text-gray-700 mb-4">
            404
          </h2>
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            {currentContent.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            {currentContent.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            href="/"
            className="block w-full bg-[#7a99c0] hover:bg-[#6a89b0] text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            {currentContent.homeButton}
          </Link>

          {/* بدل window.history.back() */}
          <Link
            href="/products"
            className="block w-full border-2 border-[#7a99c0] text-[#7a99c0] hover:bg-[#7a99c0] hover:text-white font-medium py-3 px-6 rounded-lg transition-all duration-200"
          >
            {currentContent.backButton}
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="mt-8 flex justify-center space-x-2">
          <div className="w-2 h-2 bg-[#7a99c0] rounded-full animate-pulse"></div>
          <div
            className="w-2 h-2 bg-[#7a99c0] rounded-full animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-2 h-2 bg-[#7a99c0] rounded-full animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
