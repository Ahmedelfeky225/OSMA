"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function AskAboutProductButton({ product }) {
  const t = useTranslations("products");
  const locale = useLocale();
  const router = useRouter();

  const handleClick = () => {
    const message = encodeURIComponent(
      `${t("whatsapp_message.intro")} ${product.name}\n\n` +
        `${t("whatsapp_message.description")} ${product.description}\n\n` +
        `${t("whatsapp_message.image")}: ${product.image}\n` +
        `${t("whatsapp_message.link")}: ${
          process.env.NEXT_PUBLIC_BASE_URL
        }/${locale}/products/${product.slug}`
    );

    const whatsappUrl = `https://wa.me/201234567890?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
    >
      {t("ask_about_product")}
    </button>
  );
}
