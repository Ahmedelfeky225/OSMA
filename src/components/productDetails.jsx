"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { FaWhatsapp, FaStar } from "react-icons/fa";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import RelatedProducts from "./relatedProducts";
import ReviewsSection from "./reviews/ReviewsSection";
import AddReviewForm from "./reviews/AddReviewForm";

const ProductDetails = ({ product }) => {
  console.log("PRODUCTID", product._id);
  const t = useTranslations("Product");
  const locale = useLocale();

  const {
    translations,
    brand,
    size,
    notes,
    price,
    discount,
    images,
    stock,
    averageRating,
    numReviews,
    finalPrice,
    _id,
  } = product;

  const [mainImage, setMainImage] = useState(images[0]);
  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);

  const formatPrice = (value) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "OMR",
      minimumFractionDigits: 0,
    }).format(value);

  return (
    <div className="py-6 max-w-[90%] mx-auto pt-[120px]  sm:pt-[130px] sm:pb-16">
      <div className="grid lg:grid-cols-2 gap-10">
        {/* Main Image */}
        <div>
          <div className="w-full aspect-square rounded-md text-foreground overflow-hidden flex items-center justify-center">
            <InnerImageZoom
              src={mainImage}
              zoomSrc={mainImage}
              zoomType="hover"
              zoomPreload={true}
              alt={translations[locale]?.name || "product image"}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4 overflow-x-auto pb-1 mt-4">
            {images.map((img, idx) => (
              <div
                key={idx}
                className={`w-20 aspect-square rounded-sm border-primary border-2 cursor-pointer overflow-hidden ${
                  mainImage === img ? "ring-0 ring-primary" : ""
                }`}
                onClick={() => setMainImage(img)}
              >
                <Image
                  src={img}
                  alt={`thumb-${idx}`}
                  width={80}
                  height={80}
                  className="object-contain w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-wide text-foreground mb-3">
              {translations[locale]?.name}
            </h1>
            <p className="text-sm mb-5 font-normal tracking-wide text-muted-foreground whitespace-pre-line leading-relaxed">
              {translations[locale]?.description}
            </p>
            <ul className="text-sm text-foreground space-y-2 mb-6">
              <li>
                <strong className="tracking-wide text-base font-medium">
                  {t("brand")} :
                </strong>{" "}
                <span className="text-muted-foreground tracking-wide">
                  {brand}
                </span>
              </li>
              <li>
                <strong className="tracking-wide font-medium text-base">
                  {t("size")} :
                </strong>{" "}
                <span className="text-muted-foreground tracking-wide">
                  {size}
                </span>
              </li>
            </ul>
            <div className="mb-6">
              <p className="font-medium text-lg tracking-wide mb-3 text-foreground">
                {t("notes")} :
              </p>
              <p className="text-sm text-foreground mb-2">
                <strong className="tracking-wide font-medium text-base">
                  {t("topNotes")} :
                </strong>{" "}
                <span className="text-muted-foreground tracking-wide">
                  {notes.top.join(", ")}
                </span>
              </p>
              <p className="text-sm text-foreground mb-2">
                <strong className="tracking-wide font-medium text-base">
                  {t("heartNotes")} :
                </strong>{" "}
                <span className="text-muted-foreground tracking-wide">
                  {notes.heart.join(", ")}
                </span>
              </p>
              <p className="text-sm text-foreground mb-2">
                <strong className="tracking-wide font-medium text-base">
                  {t("baseNotes")} :
                </strong>{" "}
                <span className="text-muted-foreground tracking-wide">
                  {notes.base.join(", ")}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-4 mb-5">
              <p className="text-2xl font-bold text-foreground">
                {formatPrice(finalPrice || price)}
              </p>
              {discount > 0 && (
                <p className="text-sm text-muted-foreground line-through">
                  {formatPrice(price)}
                </p>
              )}
            </div>
            <p
              className={`text-sm font-medium mb-2 ${
                stock > 0 ? "text-primary" : "text-destructive"
              }`}
            >
              {stock > 0 ? t("inStock") : t("outOfStock")}
            </p>
            {numReviews > 0 && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={
                      averageRating >= star
                        ? "text-yellow-400"
                        : averageRating >= star - 0.5
                        ? "text-yellow-400"
                        : "text-muted-foreground"
                    }
                  />
                ))}
                <span className="ml-1">{averageRating.toFixed(1)} / 5</span>
                <span className="text-muted-foreground ml-1">
                  ({numReviews} {t("reviews")})
                </span>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-border">
              <button
                onClick={() => setIsAddReviewOpen(true)}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                {locale === "ar" ? "اكتب مراجعة" : "Write a Review"}
              </button>
            </div>
            <AddReviewForm
              productId={product._id}
              isOpen={isAddReviewOpen}
              onClose={() => setIsAddReviewOpen(false)}
            />
          </div>

          <a
            href="https://wa.me/201234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground text-sm font-medium py-3 px-6 rounded-sm transition-all duration-200 hover:bg-primary/90"
          >
            <span>{t("contactWhatsapp")}</span>
            <FaWhatsapp size={20} />
          </a>
        </div>
      </div>

      <RelatedProducts productId={product._id} />
      <ReviewsSection product={product} />
    </div>
  );
};

export default ProductDetails;
