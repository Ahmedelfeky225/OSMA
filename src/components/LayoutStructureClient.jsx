// // LayoutStructureClient.js (Client Component)
// "use client";
// import { Navbar } from "@/components/navbar";
// import Footer from "@/components/footer";
// import { ReduxProvider } from "@/components/ReduxProvider";
// import { Toaster } from "react-hot-toast";
// import { Suspense } from "react";
// import FixedWhatsappButton from "./fixedWhatsappButton";

// export default function ClientLayoutStructure({ children, userData }) {
//   return (
//     <ReduxProvider>
//       <Navbar userData={userData} />
//       <main>{children}</main>
//       <Footer />
//       <Toaster
//         position="top-center"
//         toastOptions={{
//           className: "react-hot-toast",
//           duration: 4000,
//           style: { background: "#ffffff", color: "#131212" },
//         }}
//       />
//       <Suspense fallback={null}>
//         <FixedWhatsappButton />
//       </Suspense>
//     </ReduxProvider>
//   );
// }

"use client";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import { ReduxProvider } from "@/components/ReduxProvider";
import { Toaster } from "react-hot-toast";
import { Suspense, useState, useEffect } from "react";
import FixedWhatsappButton from "./fixedWhatsappButton";

export default function ClientLayoutStructure({ children, userData }) {
  const [hydrated, setHydrated] = useState(false);

  // detect client mount
  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <ReduxProvider>
      <div suppressHydrationWarning>
        <Navbar userData={hydrated ? userData : null} />
      </div>
      <main>{children}</main>
      <Footer />
      <Toaster
        position="top-center"
        toastOptions={{
          className: "react-hot-toast",
          duration: 4000,
          style: { background: "#ffffff", color: "#131212" },
        }}
      />
      <Suspense fallback={null}>
        <FixedWhatsappButton />
      </Suspense>
    </ReduxProvider>
  );
}
