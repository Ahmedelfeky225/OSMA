"use client";
import { FaStar } from "react-icons/fa";
import { useTranslations, useLocale } from "next-intl";

const RatingSummary = ({ averageRating, numReviews }) => {
  const t = useTranslations("Product");
  const locale = useLocale();

  const renderStars = (rating) => {
    return [1, 2, 3, 4, 5].map((star) => (
      <FaStar
        key={star}
        className={`w-6 h-6 ${
          rating >= star
            ? "text-yellow-400 fill-current"
            : rating >= star - 0.5
            ? "text-yellow-400 fill-current"
            : "text-muted-foreground fill-current"
        }`}
      />
    ));
  };

  return (
    <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="flex items-center space-x-1 rtl:space-x-reverse">
          {renderStars(averageRating)}
        </div>

        <div className="space-y-2">
          <div className="text-3xl font-bold text-foreground">
            {averageRating ? averageRating.toFixed(1) : "0.0"}
          </div>
          <div className="text-sm text-muted-foreground">
            {locale === "ar" ? `من أصل 5 نجوم` : "out of 5 stars"}
          </div>
          <div className="text-sm text-muted-foreground">
            {locale === "ar"
              ? `بناءً على ${numReviews} مراجعة`
              : `Based on ${numReviews} reviews`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingSummary;
