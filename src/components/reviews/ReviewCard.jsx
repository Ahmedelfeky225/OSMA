"use client";
import { FaStar, FaTrash } from "react-icons/fa";
import { useTranslations, useLocale } from "next-intl";
import { useSelector, useDispatch } from "react-redux";
import { deleteProductReview } from "@/store/reviews/reviews";

const ReviewCard = ({ review, productId, canDelete = false }) => {
  const t = useTranslations("Product");
  const locale = useLocale();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.reviews);

  const renderStars = (rating) => {
    return [1, 2, 3, 4, 5].map((star) => (
      <FaStar
        key={star}
        className={`w-4 h-4 ${
          rating >= star
            ? "text-yellow-400 fill-current"
            : "text-muted-foreground fill-current"
        }`}
      />
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDelete = () => {
    if (
      window.confirm(
        locale === "ar"
          ? "هل تريد حذف هذه المراجعة؟"
          : "Are you sure you want to delete this review?"
      )
    ) {
      dispatch(deleteProductReview({ productId, reviewId: review._id }));
    }
  };

  return (
    <div className="rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3 rtl:space-x-2">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-semibold text-sm">
              {review.name ? review.name.charAt(0).toUpperCase() : "U"}
            </span>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">
              {review.name ||
                (locale === "ar" ? "مستخدم مجهول" : "Anonymous User")}
            </h4>
            <div className="flex items-center space-x-1 rtl:space-x-reverse mt-1">
              {renderStars(review.rating)}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm text-muted-foreground">
            {formatDate(review.createdAt)}
          </span>
          {canDelete && (
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="text-destructive hover:text-destructive/80 p-1 rounded transition-colors duration-200 disabled:opacity-50"
              title={locale === "ar" ? "حذف المراجعة" : "Delete Review"}
            >
              <FaTrash className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {review.comment && (
        <p className="text-foreground leading-relaxed text-sm">
          {review.comment}
        </p>
      )}
    </div>
  );
};

export default ReviewCard;
