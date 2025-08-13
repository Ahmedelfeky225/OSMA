import { cookies } from "next/headers";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import { ReduxProvider } from "@/components/ReduxProvider";
import { Toaster } from "react-hot-toast";
import { fetchInterceptor } from "@/utils/fetchInterceptor";

export default async function LayoutStructure({ children }) {
  const cookieStore = cookies();
  const cookieString = cookieStore.toString();

  const userData = await fetchInterceptor("auth/me", {
    headers: {
      Cookie: cookieString,
    },
  }).catch(() => null);

  console.log("userData", userData);

  return (
    <ReduxProvider>
      <Navbar userData={userData} />
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
    </ReduxProvider>
  );
}
