"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import CategoryForm from "@/components/ui/dashboard/categories/categoryForm";

export default function EditCategoryPage() {
  const params = useParams();
  const t = useTranslations();

  return <CategoryForm categoryId={params.id} />;
}
