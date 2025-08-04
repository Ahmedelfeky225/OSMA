"use client";

import { Link } from "@/i18n/navigation";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaTelegramPlane,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useTranslations } from "next-intl";
import { routesFooter } from "@/data/route";
import { usePathname } from "@/i18n/navigation";
import { hideNavbarAndFooter } from "@/utils/hide-navbar-footer";
import { Sparkles, Heart } from "lucide-react";

export default function Footer() {
  const t = useTranslations("Index");
  const pathname = usePathname();

  const shouldHideHeader = hideNavbarAndFooter.some((path) => {
    if (path.includes(":path*")) {
      const basePath = path.replace("/:path*", "");
      return pathname.startsWith(basePath);
    }
    return pathname == path;
  });

  if (shouldHideHeader) return null;

  const whatsappNumber = "96877117906";
  const prefilledMessage = encodeURIComponent(t("whatsapp_prefilled_message"));
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${prefilledMessage}`;
  const instagramLink =
    "https://www.instagram.com/osma_sur?igsh=MTUwanM0cjNhOXg3Mw==";
  const facebookLink = "https://www.facebook.com/share/1AsmBnpa9B/";
  const telegramLink = "https://t.me/yourchannel";
  const phoneNumber = "+968 7711 7906";
  const email = "osmaoman7@gmail.com";

  return (
    <footer className="relative bg-[var(--footer)] text-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="max-w-[90%] mx-auto sm:text-start text-center">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-2xl" />
        </div>

        <div className="relative z-10">
          {/* Main Footer Content */}
          <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {/* Brand Section */}
              <div className="lg:col-span-1 space-y-6">
                <div className="space-y-4">
                  {/* Logo */}
                  <div className="flex items-center gap-3">
                    <div className="relativ mx-auto e sm:mx-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 200 80"
                        width="120"
                        height="48"
                        className="transition-transform hover:scale-105"
                      >
                        <defs>
                          <linearGradient
                            id="footerTextGradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#7a99c0" />
                            <stop offset="50%" stopColor="#7a99c0ac" />
                            <stop offset="100%" stopColor="#7a99c07e" />
                          </linearGradient>
                        </defs>
                        <text
                          x="100"
                          y="50"
                          fontFamily="Georgia, serif"
                          fontSize="42"
                          fontWeight="bold"
                          fill="url(#footerTextGradient)"
                          textAnchor="middle"
                          letterSpacing="2px"
                        >
                          OSMA
                        </text>
                      </svg>
                    </div>
                  </div>

                  <p className=" text-foreground opacity-50 leading-relaxed text-sm max-w-xs">
                    {t("footer_about_osma")}
                  </p>
                </div>

                {/* Social Media */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground flex items-center sm:justify-start justify-center gap-2">
                    <Heart className="w-5 h-5 text-foreground" />
                    {t("footer_follow_us")}
                  </h4>
                  <div className="flex gap-4 sm:justify-start justify-center">
                    {[
                      {
                        href: facebookLink,
                        icon: FaFacebookF,
                        label: "Facebook",
                        color: "hover:text-blue-500",
                      },
                      {
                        href: instagramLink,
                        icon: FaInstagram,
                        label: "Instagram",
                        color: "hover:text-pink-500",
                      },
                      {
                        href: whatsappLink,
                        icon: FaWhatsapp,
                        label: "WhatsApp",
                        color: "hover:text-green-500",
                      },
                      {
                        href: telegramLink,
                        icon: FaTelegramPlane,
                        label: "Telegram",
                        color: "hover:text-blue-400",
                      },
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className={`w-12 h-12 rounded-full bg-gray-800 flex  items-center justify-center text-gray-300 transition-all duration-300 hover:scale-110 hover:bg-gray-700 ${social.color}`}
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="lg:col-span-2 space-y-6 flex flex-col items-center justify-center">
                <h4 className="text-lg font-semibold  text-foreground  flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  {t("footer_quick_links_title")}
                </h4>
                <div className="flex flex-col space-y-3 text-center sm:text-start ">
                  {routesFooter.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`text-sm font-medium w-full  transition-all duration-300 hover:translate-x-1 block py-2 px-3 rounded-lg hover:bg-gray-800/50 sm:w-fit ${
                        pathname === item.href
                          ? "text-primary bg-primary/10"
                          : " text-foreground  hover:text-white"
                      }`}
                    >
                      {t(item.label)}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="lg:col-span-1 space-y-6 mx-auto">
                <h4 className="text-lg font-semibold text-foreground flex items-center mx-auto sm:mx-0 sm:w-auto w-fit  gap-2">
                  <FaMapMarkerAlt className="w-5 h-5 text-primary" />
                  {t("footer_contact_title")}
                </h4>
                <div className="space-y-6">
                  {/* Phone */}
                  <a
                    href={`tel:${phoneNumber}`}
                    className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300">
                      <FaPhone className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-foreground uppercase tracking-wide">
                        {t("footer_phone")}
                      </p>
                      <p className="font-medium  text-foreground ">
                        {phoneNumber}
                      </p>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300">
                      <FaEnvelope className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-foreground uppercase tracking-wide">
                        {t("footer_email")}
                      </p>
                      <p className="font-medium  text-foreground  text-sm break-all">
                        {email}
                      </p>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors duration-300">
                      <FaWhatsapp className="w-4 h-4 text-green-500" />
                    </div>
                    <div>
                      <p className="text-xs text-foreground  uppercase tracking-wide">
                        {t("footer_whatsapp")}
                      </p>
                      <p className="font-medium  text-foreground ">
                        {t("footer_chat_now")}
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-200/50 bg-[var(--footer)] backdrop-blur-sm">
            <div className="container  mx-auto px-4 py-6">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <div className="flex items-center flex-col sm:flex-row gap-2 text-foreground text-sm">
                  <span>{t("footer_copyright")}</span>
                  <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                  <span>{t("footer_made_with_love")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
