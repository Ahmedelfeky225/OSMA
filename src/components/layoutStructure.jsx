import { headers } from "next/headers";
import ClientLayoutStructure from "./LayoutStructureClient";

export default async function LayoutStructure({ children, locale }) {
  const headersList = await headers();
  const userAuthHeader = headersList.get("x-user-auth");

  let userData = null;

  if (userAuthHeader) {
    try {
      userData = JSON.parse(userAuthHeader);
    } catch {
      userData = null;
    }
  }

  return (
    <ClientLayoutStructure userData={userData} locale={locale}>
      {children}
    </ClientLayoutStructure>
  );
}
