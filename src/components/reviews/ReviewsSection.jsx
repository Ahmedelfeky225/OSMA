// "use client";

// import { useState, useEffect } from "react";
// import { useTranslations, useLocale } from "next-intl";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   getProductReviews,
//   setCurrentProduct,
//   clearReviews,
// } from "@/store/reviews/reviews";
// import ReviewCard from "./ReviewCard";
// import AddReviewForm from "./AddReviewForm";

// const ReviewsSection = ({ product }) => {
//   const t = useTranslations("Product");
//   const locale = useLocale();
//   const dispatch = useDispatch();

//   const { reviews, isLoading, error } = useSelector((state) => state.reviews);
//   const { user, isAuthenticated } = useSelector((state) => state.auth);

//   const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
//   const [sortBy, setSortBy] = useState("newest");
//   const [currentPage, setCurrentPage] = useState(1);
//   const reviewsPerPage = 5;

//   useEffect(() => {
//     if (product?._id) {
//       dispatch(setCurrentProduct(product._id));
//       dispatch(getProductReviews(product._id));
//     }

//     return () => {
//       dispatch(clearReviews());
//     };
//   }, [product?._id, dispatch]);

//   const canDeleteReview = (review) => {
//     return (
//       isAuthenticated &&
//       user &&
//       (user._id === review.user || user.role === "admin")
//     );
//   };

//   const getRatingDistribution = () => {
//     const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
//     reviews.forEach((review) => {
//       distribution[review.rating] = (distribution[review.rating] || 0) + 1;
//     });
//     return distribution;
//   };

//   const getSortedReviews = () => {
//     const sorted = [...reviews].sort((a, b) => {
//       switch (sortBy) {
//         case "newest":
//           return new Date(b.createdAt) - new Date(a.createdAt);
//         case "oldest":
//           return new Date(a.createdAt) - new Date(b.createdAt);
//         case "highest":
//           return b.rating - a.rating;
//         case "lowest":
//           return a.rating - b.rating;
//         default:
//           return 0;
//       }
//     });
//     return sorted;
//   };

//   const sortedReviews = getSortedReviews();
//   const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage);
//   const startIndex = (currentPage - 1) * reviewsPerPage;
//   const currentReviews = sortedReviews.slice(
//     startIndex,
//     startIndex + reviewsPerPage
//   );

//   const handleSortChange = (newSort) => {
//     setSortBy(newSort);
//     setCurrentPage(1);
//   };

//   const ratingDistribution = getRatingDistribution();
//   const totalReviews = reviews.length;

//   return (
//     <div className="mt-12 space-y-8">
//       <div className="border-b border-border pb-6">
//         <h2 className="text-2xl font-bold text-foreground mb-2">
//           {locale === "ar" ? "مراجعات العملاء" : "Customer Reviews"}
//         </h2>
//       </div>

//       <div className="bg-card rounded-lg border border-border p-6">
//         <div className="grid md:grid-cols-2 gap-8">
//           {/* Overall Rating */}
//           <div className="text-center md:text-left">
//             <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
//               <span className="text-3xl font-bold text-foreground">
//                 {product.averageRating
//                   ? product.averageRating.toFixed(1)
//                   : "0.0"}
//               </span>
//               <div className="flex">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <svg
//                     key={star}
//                     className={`w-6 h-6 ${
//                       star <= Math.round(product.averageRating || 0)
//                         ? "text-yellow-400 fill-current"
//                         : "text-gray-300"
//                     }`}
//                     viewBox="0 0 20 20"
//                   >
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//                   </svg>
//                 ))}
//               </div>
//             </div>
//             <p className="text-sm text-muted-foreground">
//               {locale === "ar"
//                 ? `${totalReviews} تقييم عالمي`
//                 : `${totalReviews} global rating${
//                     totalReviews !== 1 ? "s" : ""
//                   }`}
//             </p>
//           </div>

//           {/* Rating Distribution */}
//           <div className="space-y-2">
//             {[5, 4, 3, 2, 1].map((rating) => {
//               const count = ratingDistribution[rating] || 0;
//               const percentage =
//                 totalReviews > 0 ? (count / totalReviews) * 100 : 0;

//               return (
//                 <div key={rating} className="flex items-center gap-2 text-sm">
//                   <span className="text-primary font-medium">{rating}</span>
//                   <svg
//                     className="w-4 h-4 text-yellow-400 fill-current"
//                     viewBox="0 0 20 20"
//                   >
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//                   </svg>
//                   <div className="flex-1 bg-gray-200 rounded-full h-2">
//                     <div
//                       className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
//                       style={{ width: `${percentage}%` }}
//                     />
//                   </div>
//                   <span className="text-primary font-medium w-8 text-right">
//                     {count}
//                   </span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         <div className="mt-6 pt-6 border-t border-border">
//           <button
//             onClick={() => setIsAddReviewOpen(true)}
//             className="px-6 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
//           >
//             {locale === "ar" ? "اكتب مراجعة" : "Write a Review"}
//           </button>
//         </div>
//       </div>

//       {reviews.length > 0 && (
//         <div className="flex items-center justify-between border-b border-border pb-4">
//           <h3 className="text-lg font-semibold text-foreground">
//             {locale === "ar"
//               ? `${reviews.length} مراجعة`
//               : `${reviews.length} review${reviews.length !== 1 ? "s" : ""}`}
//           </h3>
//           <select
//             value={sortBy}
//             onChange={(e) => handleSortChange(e.target.value)}
//             className="px-3 py-1 border border-border rounded-md text-sm bg-card"
//           >
//             <option value="newest">
//               {locale === "ar" ? "الأحدث" : "Newest"}
//             </option>
//             <option value="oldest">
//               {locale === "ar" ? "الأقدم" : "Oldest"}
//             </option>
//             <option value="highest">
//               {locale === "ar" ? "أعلى تقييم" : "Highest Rating"}
//             </option>
//             <option value="lowest">
//               {locale === "ar" ? "أقل تقييم" : "Lowest Rating"}
//             </option>
//           </select>
//         </div>
//       )}

//       {/* Reviews List */}
//       <div className="space-y-6">
//         {isLoading ? (
//           <div className="text-center py-12">
//             <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent mx-auto mb-4"></div>
//             <p className="text-muted-foreground">
//               {locale === "ar"
//                 ? "جاري تحميل المراجعات..."
//                 : "Loading reviews..."}
//             </p>
//           </div>
//         ) : error ? (
//           <div className="text-center py-12">
//             <p className="text-destructive">{error}</p>
//           </div>
//         ) : reviews.length === 0 ? (
//           <div className="text-center py-16 bg-card rounded-lg border border-border">
//             <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg
//                 className="w-8 h-8 text-muted-foreground"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
//                 />
//               </svg>
//             </div>
//             <h3 className="text-lg font-semibold text-foreground mb-2">
//               {locale === "ar" ? "لا توجد مراجعات بعد" : "No Reviews Yet"}
//             </h3>
//             <p className="text-muted-foreground">
//               {locale === "ar"
//                 ? "كن أول من يشارك تجربته مع هذا المنتج"
//                 : "Be the first to share your experience with this product"}
//             </p>
//           </div>
//         ) : (
//           currentReviews.map((review) => (
//             <ReviewCard
//               key={review._id}
//               review={review}
//               productId={product._id}
//               canDelete={canDeleteReview(review)}
//             />
//           ))
//         )}
//       </div>

//       {reviews.length > reviewsPerPage && (
//         <div className="flex items-center justify-center gap-2 mt-8">
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-3 py-2 border border-border rounded-md text-sm bg-card hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {locale === "ar" ? "السابق" : "Previous"}
//           </button>

//           <div className="flex gap-1">
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//               <button
//                 key={page}
//                 onClick={() => setCurrentPage(page)}
//                 className={`px-3 py-2 text-sm rounded-md ${
//                   currentPage === page
//                     ? "bg-primary text-primary-foreground"
//                     : "border border-border bg-card hover:bg-muted"
//                 }`}
//               >
//                 {page}
//               </button>
//             ))}
//           </div>

//           <button
//             onClick={() =>
//               setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//             }
//             disabled={currentPage === totalPages}
//             className="px-3 py-2 border border-border rounded-md text-sm bg-card hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {locale === "ar" ? "التالي" : "Next"}
//           </button>
//         </div>
//       )}

//       {/* Add Review Modal */}
//       <AddReviewForm
//         productId={product._id}
//         isOpen={isAddReviewOpen}
//         onClose={() => setIsAddReviewOpen(false)}
//       />
//     </div>
//   );
// };

// export default ReviewsSection;

"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductReviews,
  setCurrentProduct,
  clearReviews,
} from "@/store/reviews/reviews";
import ReviewCard from "./ReviewCard";
import AddReviewForm from "./AddReviewForm";

const ReviewsSection = ({ product }) => {
  const t = useTranslations("Product");
  const locale = useLocale();
  const dispatch = useDispatch();

  const { reviews, isLoading, error } = useSelector((state) => state.reviews);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const reviewsPerPage = 5;

  useEffect(() => {
    if (product?._id) {
      dispatch(setCurrentProduct(product._id));
      dispatch(getProductReviews(product._id));
    }

    return () => {
      dispatch(clearReviews());
    };
  }, [product?._id, dispatch]);

  const canDeleteReview = (review) => {
    return (
      isAuthenticated &&
      user &&
      (user._id === review.user || user.role === "admin")
    );
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      distribution[review.rating] = (distribution[review.rating] || 0) + 1;
    });
    return distribution;
  };

  const getSortedReviews = () => {
    const sorted = [...reviews].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "highest":
          return b.rating - a.rating;
        case "lowest":
          return a.rating - b.rating;
        default:
          return 0;
      }
    });
    return sorted;
  };

  const sortedReviews = getSortedReviews();
  const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const currentReviews = sortedReviews.slice(
    startIndex,
    startIndex + reviewsPerPage
  );

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  const ratingDistribution = getRatingDistribution();
  const totalReviews = reviews.length;

  if (!isLoading && reviews.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 space-y-8">
      <div
        className="border-b border-border pb-6 cursor-pointer select-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {locale === "ar" ? "مراجعات العملاء" : "Customer Reviews"}
            <span className="text-lg font-normal text-muted-foreground ml-2">
              ({totalReviews})
            </span>
          </h2>
          <svg
            className={`w-6 h-6 text-muted-foreground transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {isExpanded && (
        <>
          <div className=" rounded-lg border border-border p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Overall Rating */}
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <span className="text-2xl font-medium text-foreground">
                    {product.averageRating
                      ? product.averageRating.toFixed(1)
                      : "0.0"}
                  </span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-6 h-6 ${
                          star <= Math.round(product.averageRating || 0)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-500 fill-current"
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {locale === "ar"
                    ? `${totalReviews} تقييم عالمي`
                    : `${totalReviews} global rating${
                        totalReviews !== 1 ? "s" : ""
                      }`}
                </p>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = ratingDistribution[rating] || 0;
                  const percentage =
                    totalReviews > 0 ? (count / totalReviews) * 100 : 0;

                  return (
                    <div
                      key={rating}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span className="text-primary font-medium">{rating}</span>
                      <svg
                        className="w-4 h-4 text-yellow-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-primary font-medium w-8 text-right">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <button
                onClick={() => setIsAddReviewOpen(true)}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                {locale === "ar" ? "اكتب مراجعة" : "Write a Review"}
              </button>
            </div>
          </div>

          {reviews.length > 0 && (
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="text-lg font-semibold text-foreground">
                {locale === "ar"
                  ? `${reviews.length} مراجعة`
                  : `${reviews.length} review${
                      reviews.length !== 1 ? "s" : ""
                    }`}
              </h3>
              {reviews.length > 1 && (
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="px-3  border cursor-pointer py-2 border-border rounded-md text-sm "
                >
                  <option value="newest">
                    {locale === "ar" ? "الأحدث" : "Newest"}
                  </option>
                  <option value="oldest">
                    {locale === "ar" ? "الأقدم" : "Oldest"}
                  </option>
                  <option value="highest">
                    {locale === "ar" ? "أعلى تقييم" : "Highest Rating"}
                  </option>
                  <option value="lowest">
                    {locale === "ar" ? "أقل تقييم" : "Lowest Rating"}
                  </option>
                </select>
              )}
            </div>
          )}

          {/* Reviews List */}
          <div className="space-y-6">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent mx-auto mb-4"></div>
                <p className="text-muted-foreground">
                  {locale === "ar"
                    ? "جاري تحميل المراجعات..."
                    : "Loading reviews..."}
                </p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-destructive">{error}</p>
              </div>
            ) : (
              currentReviews.map((review) => (
                <ReviewCard
                  key={review._id}
                  review={review}
                  productId={product._id}
                  canDelete={canDeleteReview(review)}
                />
              ))
            )}
          </div>

          {reviews.length > reviewsPerPage && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-border rounded-md text-sm  hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {locale === "ar" ? "السابق" : "Previous"}
              </button>

              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 text-sm rounded-md ${
                        currentPage === page
                          ? "bg-primary text-primary-foreground"
                          : "border border-border  hover:bg-muted"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-border rounded-md text-sm hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {locale === "ar" ? "التالي" : "Next"}
              </button>
            </div>
          )}
        </>
      )}

      {/* Add Review Modal */}
      <AddReviewForm
        productId={product._id}
        isOpen={isAddReviewOpen}
        onClose={() => setIsAddReviewOpen(false)}
      />
    </div>
  );
};

export default ReviewsSection;
