// "use client";

// import { FaWhatsapp } from "react-icons/fa";
// import { useTranslations } from "next-intl";
// import { useLocale } from "next-intl";
// import { useEffect } from "react"; // Import useEffect to log the link
// import { hideNavbarAndFooter } from "@/utils/hide-navbar-footer";
// import { usePathname } from "@/i18n/navigation";

// export default function FixedWhatsappButton() {
//   const t = useTranslations("Index");
//   const locale = useLocale();
//   const pathname = usePathname();

//   const whatsappNumber = "201019087739";
//   const prefilledMessage = encodeURIComponent(t("whatsapp_prefilled_message"));
//   const whatsappLink = `https://wa.me/${whatsappNumber}?text=${prefilledMessage}`;

//   // Log the generated WhatsApp link to the console for debugging
//   useEffect(() => {
//     // console.log("Generated WhatsApp Link:", whatsappLink);
//   }, [whatsappLink]);

//   // Determine positioning based on locale
//   const positionClass = locale === "ar" ? "left-4" : "right-4";
//   const shouldHideHeader = hideNavbarAndFooter.some((path) => {
//     if (path.includes(":path*")) {
//       const basePath = path.replace("/:path*", "");
//       return pathname.startsWith(basePath);
//     }
//     return pathname === path;
//   });

//   if (shouldHideHeader) return null;

//   return (
//     <a
//       href={whatsappLink}
//       target="_blank"
//       rel="noopener noreferrer"
//       aria-label={t("whatsapp_button_label")}
//       className={`fixed bottom-4 ${positionClass} bg-[var(--primary-color)] text-white p-4 rounded-full shadow-lg hover:bg-[var(--primary-color-hover)] transition-colors duration-300 z-40
//         animate-bounce-slow`}
//     >
//       <FaWhatsapp className="text-3xl" />
//     </a>
//   );
// }

"use client";
import { FaWhatsapp } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { hideNavbarAndFooter } from "@/utils/hide-navbar-footer";
import { usePathname } from "@/i18n/navigation";

export default function FixedWhatsappButton() {
  const t = useTranslations("Index");
  const locale = useLocale();
  const pathname = usePathname();

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const prefilledMessage = encodeURIComponent(t("whatsapp_prefilled_message"));
  const cleanWhatsappNumber = whatsappNumber
    ?.replace(/\s+/g, "")
    .replace(/^\+/, "");
  const whatsappLink = `https://wa.me/${cleanWhatsappNumber}?text=${prefilledMessage}`;

  const positionClass = locale === "ar" ? "left-4" : "right-4";

  const shouldHideHeader = hideNavbarAndFooter.some((path) => {
    if (path.includes(":path*")) {
      const basePath = path.replace("/:path*", "");
      return pathname.startsWith(basePath);
    }
    return pathname === path;
  });

  if (shouldHideHeader || !cleanWhatsappNumber) return null;

  return (
    <div
      className={`fixed bottom-4 ${
        locale === "ar" ? "right-5" : "left-5"
      }  ${positionClass} z-10 group`}
    >
      {/* Pulsing Ring */}
      <div className="absolute inset-0 w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] rounded-full animate-ping opacity-20"></div>

      {/* Main Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("whatsapp_button_label")}
        className="
          relative flex items-center justify-center
          w-14 h-14 sm:w-16 sm:h-16
          bg-gradient-to-br from-[#25D366] to-[#128C7E]
          rounded-full shadow-xl
          hover:shadow-2xl hover:scale-110
          active:scale-95
          transition-all duration-300
          border-2 border-white/20
        "
      >
        <FaWhatsapp className="text-white text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-300" />

        {/* Notification Dot */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-bounce">
          <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5 animate-pulse"></div>
        </div>
      </a>

      {/* Tooltip */}
      <div
        className={`
        absolute bottom-full mb-3 ${locale === "ar" ? "right-0" : "left-0"}
        opacity-0 group-hover:opacity-100
        transform translate-y-2 group-hover:translate-y-0
        transition-all duration-300 pointer-events-none
      `}
      >
        <div className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg shadow-lg whitespace-nowrap">
          {t("whatsapp_button_label")}
          <div
            className={`absolute top-full ${
              locale === "ar" ? "right-3" : "left-3"
            } w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900`}
          ></div>
        </div>
      </div>
    </div>
  );
}
