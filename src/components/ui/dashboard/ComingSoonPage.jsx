"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export function ComingSoonPage() {
  const t = useTranslations("settings");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 ${
        isRTL ? "rtl" : "ltr"
      }`}
    >
      <button
        onClick={handleBackClick}
        className={`absolute top-6 ${
          isRTL ? "right-6" : "left-6"
        } flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors duration-200 hover:bg-muted/50 rounded-lg`}
      >
        <svg
          className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className="text-sm font-medium">{t("backHome")}</span>
      </button>

      <div className="text-center max-w-2xl mx-auto px-6 py-12">
        <div className="md:mb-8 mb-4">
          <div className="md:w-20 md:h-20 w-10 h-10 p-1 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-10 h-10 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
        </div>

        <h1 className="md:text-5xl text-lg font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          {t("title")}
        </h1>

        <h2 className="md:text-3xl text-xl tracking-wide text-primary/80 md:mb-8 mb-4 font-semibold">
          {t("comingSoon")}
        </h2>

        <p className="text-sm md:text-xl text-muted-foreground mb-2 md:mb-6 leading-relaxed">
          {t("subtitle")}
        </p>

        <p className="text-sm md:text-lg text-muted-foreground/80 leading-relaxed max-w-lg mx-auto">
          {t("description")}
        </p>

        <div className="mt-12 flex justify-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
