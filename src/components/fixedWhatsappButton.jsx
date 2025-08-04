"use client";

import { FaWhatsapp } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { useEffect } from "react"; // Import useEffect to log the link
import { hideNavbarAndFooter } from "@/utils/hide-navbar-footer";
import { usePathname } from "@/i18n/navigation";

export default function FixedWhatsappButton() {
  const t = useTranslations("Index");
  const locale = useLocale();
  const pathname = usePathname();

  const whatsappNumber = "201019087739";
  const prefilledMessage = encodeURIComponent(t("whatsapp_prefilled_message"));
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${prefilledMessage}`;

  // Log the generated WhatsApp link to the console for debugging
  useEffect(() => {
    console.log("Generated WhatsApp Link:", whatsappLink);
  }, [whatsappLink]);

  // Determine positioning based on locale
  const positionClass = locale === "ar" ? "left-4" : "right-4";
  const shouldHideHeader = hideNavbarAndFooter.some((path) => {
    if (path.includes(":path*")) {
      const basePath = path.replace("/:path*", "");
      return pathname.startsWith(basePath);
    }
    return pathname === path;
  });

  if (shouldHideHeader) return null;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsapp_button_label")}
      className={`fixed bottom-4 ${positionClass} bg-[var(--primary-color)] text-white p-4 rounded-full shadow-lg hover:bg-[var(--primary-color-hover)] transition-colors duration-300 z-50
        animate-bounce-slow`}
    >
      <FaWhatsapp className="text-3xl" />
    </a>
  );
}
