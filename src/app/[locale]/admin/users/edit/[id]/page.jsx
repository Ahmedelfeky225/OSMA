"use client";
import { useParams } from "next/navigation";
import UserForm from "@/components/ui/dashboard/users/UserForm";

export default function EditUserPage() {
  const params = useParams();
  const userId = params.id;

  return <UserForm userId={userId} />;
}
