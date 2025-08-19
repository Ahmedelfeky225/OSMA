import { cookies } from "next/headers";
import { fetchInterceptor } from "@/utils/fetchInterceptor";
import ClientLayoutStructure from "./LayoutStructureClient";

export default async function LayoutStructure({ children, userAuth }) {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  // fetch userData فقط إذا موجودة cookies
  let userData = null;
  if (cookieString) {
    userData = await fetchInterceptor("auth/me", {
      headers: { Cookie: cookieString },
    }).catch(() => null);
  }

  return (
    <ClientLayoutStructure userData={userData ?? userAuth}>
      {children}
    </ClientLayoutStructure>
  );
}
