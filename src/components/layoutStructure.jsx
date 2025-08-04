import { cookies } from "next/headers";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import { ReduxProvider } from "@/components/ReduxProvider";
import { Toaster } from "react-hot-toast";
import { fetchInterceptor } from "@/utils/fetchInterceptor";

export default async function LayoutStructure({ children, userAuth }) {
  const userData = await fetchInterceptor("auth/me");

  return (
    <ReduxProvider>
      <Navbar isAuth={!!userAuth} user={userAuth} userData={userData} />
      <main>{children}</main>
      <Footer />
      <Toaster
        position="top-center"
        toastOptions={{
          className: "react-hot-toast",
          duration: 4000,
          style: {
            background: "#ffffff",
            color: "#131212",
          },
        }}
      />
    </ReduxProvider>
  );
}
