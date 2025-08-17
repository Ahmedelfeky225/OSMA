import Image from "next/image";
import { useLocale } from "next-intl";
import { Edit, Trash2, Star, Package } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Assuming shadcn/ui Card
import { Button } from "@/components/ui/button"; // Assuming shadcn/ui Button

export default function ProductsGrid({
  products,
  onEdit,
  onDelete,
  locale,
  t,
}) {
  const isRTL = locale === "ar";

  const getProductName = (product) => {
    return locale === "ar"
      ? product.translations?.ar?.name
      : product.translations?.en?.name;
  };

  const getCategoryName = (category) => {
    return locale === "ar"
      ? category?.translations?.ar?.name || category?.name
      : category?.translations?.en?.name || category?.name;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8 flex-grow">
      {products.map((product) => {
        const firstImage = product.images?.[0];
        const imageSrc =
          firstImage &&
          typeof firstImage === "string" &&
          firstImage.trim() !== "" &&
          `${firstImage}`;
        // : "/diverse-products-still-life.png";

        return (
          <Card
            key={product._id}
            className="rounded-sm overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 flex flex-col"
          >
            <CardHeader className="p-0 relative">
              <Image
                src={imageSrc}
                alt={getProductName(product)} // Added default alt text
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              {product.isFeatured && (
                <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-sm text-xs font-medium flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current" /> {t("grid.featured")}
                </div>
              )}
              {product.stock === 0 && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-sm text-xs font-medium">
                  {t("grid.soldOut")}
                </div>
              )}
            </CardHeader>
            <CardContent className="p-4 flex-grow">
              <CardTitle
                className="text-lg font-semibold mb-2"
                dir={isRTL ? "rtl" : "ltr"}
              >
                {getProductName(product)}
              </CardTitle>
              <p
                className="text-gray-600 dark:text-gray-400 text-sm mb-2 flex items-center gap-1"
                dir={isRTL ? "rtl" : "ltr"}
              >
                <Package className="h-4 w-4 text-gray-500" />{" "}
                {getCategoryName(product.category)}
              </p>
              <p
                className="text-xl font-bold text-gray-900 dark:text-white mb-2"
                style={{ color: "var(--primary-color)" }}
              >
                {product.price?.toFixed(2)} OMR
              </p>
              <p
                className="text-sm text-gray-700 dark:text-gray-300"
                dir={isRTL ? "rtl" : "ltr"}
              >
                {t("grid.stock")}:{" "}
                {product.stock > 0 ? product.stock : t("grid.outOfStock")}
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(product._id)}
                className="rounded-sm"
              >
                <Edit className="h-4 w-4 mr-2" /> {t("grid.edit")}
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(product)}
                className="rounded-sm"
              >
                <Trash2 className="h-4 w-4 mr-2" /> {t("grid.delete")}
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
