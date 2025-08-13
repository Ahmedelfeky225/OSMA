import Image from "next/image";
import { useLocale } from "next-intl";
import { Edit, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming shadcn/ui Button

export default function ProductsTable({
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
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-sm shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden mb-8 flex-grow">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                {t("table.image")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("table.name")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("table.category")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("table.price")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("table.stock")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("table.isFeatured")}
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                {t("table.actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const firstImage = product.images?.[0];
              const imageSrc =
                firstImage &&
                typeof firstImage === "string" &&
                firstImage.trim() !== "" &&
                `${firstImage}`;
              // : "/diverse-products-still-life.png";

              return (
                <tr
                  key={product._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4">
                    <Image
                      src={imageSrc || "/placeholder.svg"}
                      alt={getProductName(product) || "Product image"} // Added default alt text
                      width={64}
                      height={64}
                      className="w-16 h-16 object-cover rounded-sm"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    {getProductName(product)}
                    {product.isFeatured && (
                      <span className="ml-2 inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                        <Star className="h-3 w-3 mr-1" /> {t("table.featured")}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {getCategoryName(product.category)}
                  </td>
                  <td className="px-6 py-4">{product.price?.toFixed(2)} OMR</td>
                  <td className="px-6 py-4">
                    {product.stock > 0 ? (
                      <span className="text-green-600 dark:text-green-400">
                        {product.stock}
                      </span>
                    ) : (
                      <span className="text-red-600 dark:text-red-400">
                        {t("table.soldOut")}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {product.isFeatured ? (
                      <Star className="h-5 w-5 text-yellow-500 fill-current mx-auto" />
                    ) : (
                      <Star className="h-5 w-5 text-gray-400 mx-auto" />
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onEdit(product._id)}
                        className="rounded-sm"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => onDelete(product)}
                        className="rounded-sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
