import { Button } from "@/components/ui/button"; // Assuming shadcn/ui Button
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginationControls({
  pagination,
  onPageChange,
  isRTL,
  t,
}) {
  const { currentPage, totalPages, total } = pagination;

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      {" "}
      {/* Reduced margin-top */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-sm"
      >
        {isRTL ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>
      {pages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          onClick={() => onPageChange(page)}
          className="rounded-sm"
          style={
            currentPage === page ? { background: "var(--primary-color)" } : {}
          }
        >
          {page}
        </Button>
      ))}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-sm"
      >
        {isRTL ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
