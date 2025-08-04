// components/productDetails.jsx
"use client";

import React, { useState, Fragment } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { FaWhatsapp, FaStar } from "react-icons/fa";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import { Dialog, Transition } from "@headlessui/react";
import RelatedProducts from "./relatedProducts";

const ProductDetails = ({ product }) => {
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
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatPrice = (value) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "OMR",
      minimumFractionDigits: 0,
    }).format(value);

  const handleSubmitRating = () => {
    console.log({
      rating: userRating,
      comment: userComment,
    });
    setUserRating(0);
    setUserComment("");
    setIsModalOpen(false);
  };

  return (
    <div className="py-6 max-w-[90%] mx-auto sm:my-12 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-10">
        {/* Main Image */}
        <div>
          <div className="w-full aspect-square rounded-md   text-foreground overflow-hidden flex items-center justify-center">
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
                className={`w-20 aspect-square rounded-sm border-[var(--primary-color)]  border-2 cursor-pointer overflow-hidden ${
                  mainImage === img ? "ring-0 ring-[var(--primary-color)]" : ""
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
                <p className="text-sm text-gray-400 line-through">
                  {formatPrice(price)}
                </p>
              )}
            </div>

            <p
              className={`text-sm font-medium mb-2 ${
                stock > 0 ? "text-emerald-600" : "text-rose-500"
              }`}
            >
              {stock > 0 ? t("inStock") : t("outOfStock")}
            </p>

            {numReviews > 0 && (
              <div className="flex items-center gap-1 text-sm text-slate-700 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={
                      averageRating >= star
                        ? "text-yellow-400"
                        : averageRating >= star - 0.5
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
                <span className="ml-1">{averageRating.toFixed(1)} / 5</span>
                <span className="text-gray-500 ml-1">
                  ({numReviews} {t("reviews")})
                </span>
              </div>
            )}
            <button
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer mt-2 px-4 py-2 btn-primary text-white rounded text-sm font-medium"
            >
              {t("rateProduct")}
            </button>
          </div>

          <a
            href="https://wa.me/201234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-2 btn-primary text-white text-sm font-medium py-3 px-6 rounded-sm transition-all duration-200"
          >
            <span>{t("contactWhatsapp")}</span>
            <FaWhatsapp size={20} />
          </a>
        </div>
      </div>

      {/* Rating Modal */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsModalOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[#0000001b] bg-opacity-30" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto backdrop-blur-sm">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-muted p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="text-lg font-medium text-foreground mb-4">
                    {t("rateProduct")}
                  </Dialog.Title>

                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <FaStar
                        key={value}
                        size={28}
                        onClick={() => setUserRating(value)}
                        className={`cursor-pointer transition-colors fill-current ${
                          userRating >= value
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <textarea
                    value={userComment}
                    onChange={(e) => setUserComment(e.target.value)}
                    placeholder={t("writeComment")}
                    className="w-full border border-slate-300 rounded-sm p-3 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 transition duration-200"
                    rows={4}
                  />

                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="cursor-pointer text-sm px-4 py-2 bg-gray-400  hover:bg-gray-300 rounded-sm"
                    >
                      {t("cancel")}
                    </button>
                    <button
                      onClick={handleSubmitRating}
                      className="cursor-pointer text-sm px-4 py-2 btn-primary rounded-sm"
                    >
                      {t("submit")}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* <RelatedProducts productId={} /> */}
    </div>
  );
};

export default ProductDetails;
