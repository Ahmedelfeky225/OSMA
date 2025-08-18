"use client";

import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useTranslations, useLocale } from "next-intl";
import { useSelector, useDispatch } from "react-redux";
import { addProductReview, clearState } from "@/store/reviews";
import { checkAuthStatus } from "@/store/auth";

const AddReviewForm = ({ productId, isOpen, onClose }) => {
  const t = useTranslations("Product");
  const locale = useLocale();
  const dispatch = useDispatch();

  const { submitting, error, message } = useSelector((state) => state.reviews);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { currentUser } = useSelector((state) => state.users);

  const [formData, setFormData] = useState({
    rating: 0,
    comment: "",
  });

  const [hoveredRating, setHoveredRating] = useState(0);

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  useEffect(() => {
    if (message && !error) {
      // Show success state briefly before reload
      dispatch(clearState());
      onClose();
      window.location.reload();
    }
  }, [message, error, onClose, dispatch]);

  const isUserLoggedIn = isAuthenticated && currentUser && currentUser._id;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isUserLoggedIn) {
      alert(locale === "ar" ? "يجب تسجيل الدخول أولاً" : "Please login first");
      return;
    }

    if (formData.rating === 0) {
      alert(locale === "ar" ? "يرجى اختيار تقييم" : "Please select a rating");
      return;
    }

    dispatch(
      addProductReview({
        productId,
        reviewData: {
          rating: formData.rating,
          comment: formData.comment.trim(),
        },
      })
    );
  };

  const handleRatingClick = (rating) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-lg p-6 w-full max-w-sm border border-border shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            {/* {locale === "ar" ? "اكتب مراجعة" : "Write a Review"} */}
          </h3>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-1"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {!isUserLoggedIn ? (
          /* Simplified login required message */
          <div className="text-center py-6">
            <p className="text-foreground mb-4">
              {locale === "ar"
                ? "يجب تسجيل الدخول لإضافة مراجعة"
                : "Please login to add a review"}
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
            >
              {locale === "ar" ? "إغلاق" : "Close"}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {locale === "ar" ? "التقييم" : "Rating"}
              </label>
              <div className="flex items-center justify-center space-x-1 rtl:space-x-reverse">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="p-1"
                  >
                    <FaStar
                      className={`w-6 h-6 ${
                        (hoveredRating || formData.rating) >= star
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {locale === "ar" ? "التعليق" : "Comment"}
              </label>
              <textarea
                value={formData.comment}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, comment: e.target.value }))
                }
                placeholder={
                  locale === "ar"
                    ? "اكتب تعليقك هنا..."
                    : "Write your comment here..."
                }
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {message && !error && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-600 text-sm">{message}</p>
              </div>
            )}

            <div className="flex justify-end space-x-3 rtl:space-x-reverse pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={submitting}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                {locale === "ar" ? "إلغاء" : "Cancel"}
              </button>
              <button
                type="submit"
                disabled={submitting || formData.rating === 0}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
              >
                {submitting
                  ? locale === "ar"
                    ? "جاري الإرسال..."
                    : "Submitting..."
                  : locale === "ar"
                  ? "إرسال"
                  : "Submit"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddReviewForm;
