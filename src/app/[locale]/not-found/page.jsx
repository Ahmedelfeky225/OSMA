"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

export default function NotFound() {
  const locale = useLocale();

  const content = {
    ar: {
      title: "الصفحة غير موجودة",
      description: "عذراً، لا يمكننا العثور على الصفحة التي تبحث عنها",
      homeButton: "العودة للرئيسية",
      backButton: "الصفحة السابقة",
    },
    en: {
      title: "Page Not Found",
      description: "Sorry, we couldn't find the page you're looking for",
      homeButton: "Back to Home",
      backButton: "Go Back",
    },
  };

  const currentContent = content[locale] || content.en;

  return (
    <div className="min-h-screen bg-white dark:bg-[#1b2535] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#7a99c0] mb-2">OSMA</h1>
          <div className="w-16 h-1 bg-[#7a99c0] mx-auto rounded-full"></div>
        </div>

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

        <div className="space-y-4">
          <Link
            href="/"
            className="block w-full bg-[#7a99c0] hover:bg-[#6a89b0] text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            {currentContent.homeButton}
          </Link>

          <button
            onClick={() => window.history.back()}
            className="block w-full border-2 border-[#7a99c0] text-[#7a99c0] hover:bg-[#7a99c0] hover:text-white font-medium py-3 px-6 rounded-lg transition-all duration-200"
          >
            {currentContent.backButton}
          </button>
        </div>
      </div>
    </div>
  );
}
