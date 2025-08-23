// // import { cookies } from "next/headers";
// // import { fetchInterceptor } from "@/utils/fetchInterceptor";
// // import ClientLayoutStructure from "./LayoutStructureClient";

// // export default async function LayoutStructure({ children, userAuth }) {
// //   const cookieStore = await cookies();
// //   const tokenCookie = cookieStore.get("token");

// //   let userData = null;

// //   // ✅ لو في توكن في الكوكي، هاته
// //   if (tokenCookie) {
// //     userData = await fetchInterceptor("auth/me", {
// //       headers: { Authorization: `Bearer ${tokenCookie.value}` },
// //     }).catch(() => null);
// //   }

// //   return (
// //     <ClientLayoutStructure userData={userData ?? userAuth}>
// //       {children}
// //     </ClientLayoutStructure>
// //   );
// // }

// import { cookies } from "next/headers";
// import { fetchInterceptor } from "@/utils/fetchInterceptor";
// import ClientLayoutStructure from "./LayoutStructureClient";

// export default async function LayoutStructure({ children, userAuth }) {
//   const cookieStore = await cookies();
//   const tokenCookie = cookieStore.get("token");
//   const localeCookie = cookieStore.get("NEXT_LOCALE");

//   const locale = localeCookie?.value ?? "en";
//   let userData = null;

//   if (tokenCookie) {
//     userData = await fetchInterceptor("auth/me", {
//       headers: { Authorization: `Bearer ${tokenCookie.value}` },
//     }).catch(() => null);
//   }

//   return (
//     <ClientLayoutStructure userData={userData ?? userAuth} locale={locale}>
//       {children}
//     </ClientLayoutStructure>
//   );
// }

import { cookies } from "next/headers";
import { fetchInterceptor } from "@/utils/fetchInterceptor";
import ClientLayoutStructure from "./LayoutStructureClient";

export default async function LayoutStructure({ children, userAuth }) {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("token");
  const localeCookie = cookieStore.get("NEXT_LOCALE");

  const locale = localeCookie?.value ?? "en";
  let userData = null;

  if (tokenCookie) {
    userData = await fetchInterceptor("auth/me", {
      headers: { Authorization: `Bearer ${tokenCookie.value}` },
    }).catch(() => null);
  }

  return (
    <ClientLayoutStructure userData={userData ?? userAuth} locale={locale}>
      {children}
    </ClientLayoutStructure>
  );
}
