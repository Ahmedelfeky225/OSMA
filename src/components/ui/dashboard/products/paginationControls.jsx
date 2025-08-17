// import { Button } from "@/components/ui/button"; // Assuming shadcn/ui Button
// import { ChevronLeft, ChevronRight } from "lucide-react";

// export default function PaginationControls({
//   pagination,
//   onPageChange,
//   isRTL,
//   t,
// }) {
//   const { currentPage, totalPages, total } = pagination;

//   if (totalPages <= 1) return null;

//   const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

//   return (
//     <div className="flex justify-center items-center gap-2 mt-4">
//       {" "}
//       {/* Reduced margin-top */}
//       <Button
//         variant="outline"
//         size="icon"
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className="rounded-sm"
//       >
//         {isRTL ? (
//           <ChevronRight className="h-4 w-4" />
//         ) : (
//           <ChevronLeft className="h-4 w-4" />
//         )}
//       </Button>
//       {pages.map((page) => (
//         <Button
//           key={page}
//           variant={currentPage === page ? "default" : "outline"}
//           onClick={() => onPageChange(page)}
//           className="rounded-sm"
//           style={
//             currentPage === page ? { background: "var(--primary-color)" } : {}
//           }
//         >
//           {page}
//         </Button>
//       ))}
//       <Button
//         variant="outline"
//         size="icon"
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className="rounded-sm"
//       >
//         {isRTL ? (
//           <ChevronLeft className="h-4 w-4" />
//         ) : (
//           <ChevronRight className="h-4 w-4" />
//         )}
//       </Button>
//     </div>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

export default function PaginationControls({
  pagination,
  onPageChange,
  isRTL,
  t,
  locale,
}) {
  const { currentPage, totalPages, total } = pagination;

  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else {
      pages.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
      );
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  const getTranslation = (key) => {
    const translations = {
      previous: locale === "ar" ? "السابق" : "Previous",
      next: locale === "ar" ? "التالي" : "Next",
      of: locale === "ar" ? "من" : "of",
    };
    return translations[key];
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-lg px-3 py-2 md:size-9 md:px-0 hover:bg-primary/10 transition-colors"
      >
        {isRTL ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
        <span className="ml-1 md:hidden">{getTranslation("previous")}</span>
      </Button>

      <div className="md:hidden flex items-center px-3 py-1 bg-muted rounded-lg text-sm font-medium">
        {currentPage} {getTranslation("of")} {totalPages}
      </div>

      <div className="hidden md:flex items-center gap-1">
        {visiblePages.map((page, index) =>
          page === "..." ? (
            <div key={`ellipsis-${index}`} className="px-2">
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </div>
          ) : (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page)}
              className="rounded-lg size-9 p-0 hover:bg-primary/10 transition-colors"
              style={
                currentPage === page
                  ? { background: "var(--primary-color)" }
                  : {}
              }
            >
              {page}
            </Button>
          )
        )}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-lg px-3 py-2 md:size-9 md:px-0 hover:bg-primary/10 transition-colors"
      >
        <span className="mr-1 md:hidden">{getTranslation("next")}</span>
        {isRTL ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
