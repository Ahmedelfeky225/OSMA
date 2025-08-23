// "use client";

// import { useEffect } from "react";
// import { useLocale } from "next-intl";
// import Link from "next/link";

// export default function Error({ error, reset }) {
//   const locale = useLocale();

//   useEffect(() => {
//     console.error(error);
//   }, [error]);

//   const content = {
//     ar: {
//       title: "حدث خطأ ما!",
//       description: "عذراً، حدث خطأ غير متوقع",
//       retryButton: "المحاولة مرة أخرى",
//       homeButton: "العودة للرئيسية",
//       supportText: "إذا استمر الخطأ، يرجى التواصل مع الدعم الفني",
//     },
//     en: {
//       title: "Something went wrong!",
//       description: "Sorry, an unexpected error occurred",
//       retryButton: "Try Again",
//       homeButton: "Back to Home",
//       supportText: "If the error persists, please contact technical support",
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

//         {/* Error Icon */}
//         <div className="mb-8">
//           <div className="w-20 h-20 mx-auto mb-6 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
//             <svg
//               className="w-10 h-10 text-red-500"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
//               />
//             </svg>
//           </div>

//           <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
//             {currentContent.title}
//           </h2>
//           <p className="text-gray-600 dark:text-gray-300 mb-2">
//             {currentContent.description}
//           </p>
//         </div>

//         {/* Error Details */}
//         {/* {error?.message && (
//           <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg">
//             <p className="text-sm text-red-600 dark:text-red-400 font-mono">
//               {error.message}
//             </p>
//           </div>
//         )} */}

//         {/* Action Buttons */}
//         <div className="space-y-4">
//           <button
//             onClick={reset}
//             className="block w-full bg-[#7a99c0] hover:bg-[#6a89b0] text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
//           >
//             {currentContent.retryButton}
//           </button>

//           <Link
//             // onClick={() => (window.location.href = "/")}
//             href="/"
//             className="block w-full border-2 border-[#7a99c0] text-[#7a99c0] hover:bg-[#7a99c0] hover:text-white font-medium py-3 px-6 rounded-lg transition-all duration-200"
//           >
//             {currentContent.homeButton}
//           </Link>
//         </div>

//         {/* Support Info */}
//         <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
//           <p className="text-sm text-gray-600 dark:text-gray-400">
//             {currentContent.supportText}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";

export default function Error({ error, reset }) {
  const locale = useLocale();

  useEffect(() => {
    console.error(error);
  }, [error]);

  const content = {
    ar: {
      title: "حدث خطأ ما!",
      description: "عذراً، حدث خطأ غير متوقع",
      retryButton: "المحاولة مرة أخرى",
      reloadButton: "إعادة تحميل الصفحة",
      homeButton: "العودة للرئيسية",
      supportText: "إذا استمر الخطأ، يرجى التواصل مع الدعم الفني",
    },
    en: {
      title: "Something went wrong!",
      description: "Sorry, an unexpected error occurred",
      retryButton: "Try Again",
      reloadButton: "Reload Page",
      homeButton: "Back to Home",
      supportText: "If the error persists, please contact technical support",
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

        {/* Error Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            {currentContent.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            {currentContent.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          {/* Try Again (reset) */}
          <button
            onClick={reset}
            className="block w-full bg-[#7a99c0] hover:bg-[#6a89b0] text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            {currentContent.retryButton}
          </button>

          {/* Reload Page */}
          <button
            onClick={() => window.location.reload()}
            className="block w-full border-2 border-[#7a99c0] text-[#7a99c0] hover:bg-[#7a99c0] hover:text-white font-medium py-3 px-6 rounded-lg transition-all duration-200"
          >
            {currentContent.reloadButton}
          </button>

          {/* Back to Home */}
          <Link
            href="/"
            className="block w-full border-2 border-[#7a99c0] text-[#7a99c0] hover:bg-[#7a99c0] hover:text-white font-medium py-3 px-6 rounded-lg transition-all duration-200"
          >
            {currentContent.homeButton}
          </Link>
        </div>

        {/* Support Info */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {currentContent.supportText}
          </p>
        </div>
      </div>
    </div>
  );
}
