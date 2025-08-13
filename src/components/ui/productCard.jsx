"use client";

import CustomImage from "../customImage";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa";
import { Star, Heart, Eye, ShoppingCart } from "lucide-react";
import { useState } from "react";

const ProductCard = ({ product }) => {
  // console.log(product);
  const t = useTranslations("products");
  const locale = useLocale();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const {
    images,
    discount,
    translations,
    price,
    finalPrice,
    averageRating = 0,
    numReviews = 0,
    _id,
  } = product;

  const name = translations?.[locale]?.name || product?.name || "اسم المنتج";
  const description =
    translations?.[locale]?.description || product?.description || "";
  const image = images?.[0] || "";

  const formatPrice = (value) => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "OMR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const generateWhatsAppLink = () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://yourdomain.com";
    const productUrl = `${baseUrl}/${locale}/products/${_id}`;
    const message = `${t("whatsapp_message.intro")} ${name}\n\n${t(
      "whatsapp_message.description"
    )} ${description}\n\n${t("whatsapp_message.image")}: ${image}\n${t(
      "whatsapp_message.link"
    )}: ${productUrl}`;
    return `https://wa.me/201005845202?text=${encodeURIComponent(message)}`;
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-3 h-3 ${
              index < rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-gray-700 hover:-translate-y-2 w-full max-w-sm mx-auto">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7a99c0]/0 to-[#5a7ba0]/0 group-hover:from-[#7a99c0]/5 group-hover:to-[#5a7ba0]/5 transition-all duration-500 rounded-2xl"></div>

      {/* Decorative elements */}
      <div className="absolute top-3 right-3 w-16 h-16 bg-gradient-to-br from-[#7a99c0]/8 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute bottom-3 left-3 w-8 h-8 bg-gradient-to-br from-[#5a7ba0]/8 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Product Image */}
      <div className="relative overflow-hidden">
        <Link
          className="relative block aspect-square overflow-hidden rounded-t-2xl"
          href={`/products/${product._id}`}
        >
          {image && (
            <CustomImage
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              src={image}
              alt={name}
              width={300}
              height={300}
            />
          )}

          {/* Image overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </Link>

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 z-20">
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg transform -rotate-12 group-hover:-rotate-6 transition-transform duration-300">
              <span>
                {discount}% {locale === "en" ? "sale" : "خصم"}
              </span>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              isWishlisted
                ? "bg-red-500 text-white"
                : "bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:bg-red-500 hover:text-white"
            } shadow-lg hover:scale-110`}
          >
            <Heart
              className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`}
            />
          </button>

          <Link
            href={`/products/${_id}`}
            className="w-8 h-8 rounded-full bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:bg-[#7a99c0] hover:text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>

        {/* OSMA Brand Badge */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-2 py-1 shadow-lg">
            <span className="text-[#7a99c0] font-bold text-xs">OSMA</span>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="relative z-10 p-5">
        <Link href={`/products/${_id}`} className="block mb-3">
          <h3 className="text-lg font-bold text-slate-800 dark:text-gray-200 mb-2 line-clamp-1 group-hover:text-[#7a99c0] dark:group-hover:text-[#8fa5c8] transition-colors duration-300">
            {name}
          </h3>

          <p className="text-sm text-slate-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </Link>

        {/* Rating */}
        {averageRating > 0 && (
          <div className="flex items-center gap-2 mb-3">
            {renderStars(Math.round(averageRating))}
            <span className="text-xs text-slate-500 dark:text-gray-400">
              {/* ({numReviews} {t("reviews")}) */}
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xl font-bold bg-gradient-to-r from-[#7a99c0] to-[#5a7ba0] bg-clip-text text-transparent">
            {formatPrice(finalPrice)}
          </span>
          {discount > 0 && (
            <span className="text-sm text-slate-400 dark:text-gray-500 line-through">
              {formatPrice(price)}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <a
            href={generateWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r bg-primary hover:to-green-700 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 group/btn"
          >
            <FaWhatsapp className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
            <span>{t("ask_about_product")}</span>
          </a>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7a99c0] to-[#5a7ba0] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center rounded-b-2xl"></div>

      {/* Floating shadow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#7a99c0]/10 to-[#5a7ba0]/10 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10 transform translate-y-4"></div>
    </div>
  );
};

export default ProductCard;
