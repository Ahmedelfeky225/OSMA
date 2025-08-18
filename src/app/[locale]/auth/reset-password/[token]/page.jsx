// "use client";

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter, useParams } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { useTranslations, useLocale } from "next-intl"; // ✅ استيراد useLocale
// import toast from "react-hot-toast";

// // استيراد مكونات MUI
// import {
//   Box,
//   Button,
//   Container,
//   TextField,
//   Typography,
//   CircularProgress,
// } from "@mui/material";

// // استيراد مكونات MUI Providers
// import { CacheProvider } from "@emotion/react";
// import createCache from "@emotion/cache";
// import { prefixer } from "stylis";
// import rtlPlugin from "stylis-plugin-rtl";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";

// import { resetPassword, clearState } from "@/store/auth";

// export default function ResetPasswordPage() {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const { token } = useParams();
//   const t = useTranslations("Auth.ResetPassword");
//   const locale = useLocale(); // ✅ الحصول على اللغة الحالية

//   const { isLoading, error, message } = useSelector((state) => state.auth);

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(clearState());
//     }

//     if (message) {
//       toast.success(message);
//       setTimeout(() => {
//         router.push("/auth/login");
//       }, 2000);
//       dispatch(clearState());
//     }
//   }, [error, message, dispatch, router]);

//   const onSubmit = (data) => {
//     dispatch(
//       resetPassword({
//         token,
//         newPassword: data.password,
//         confirmPassword: data.confirmPassword,
//       })
//     );
//   };

//   // ✅ تحديد اتجاه اللغة ودعمها بشكل ديناميكي
//   const isRtl = locale === "ar";
//   const theme = createTheme({
//     direction: isRtl ? "rtl" : "ltr",
//     typography: {
//       fontFamily: isRtl ? "Rubik, sans-serif" : "Poppins, sans-serif",
//     },
//   });
//   const cacheRtl = createCache({
//     key: "muirtl",
//     stylisPlugins: [prefixer, rtlPlugin],
//   });
//   const cacheLtr = createCache({ key: "muiltr" });

//   return (
//     <CacheProvider value={isRtl ? cacheRtl : cacheLtr}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <Container
//           maxWidth="sm"
//           sx={{
//             minHeight: "100vh",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <Box
//             component="form"
//             onSubmit={handleSubmit(onSubmit)}
//             sx={{ width: "100%", p: 0 }}
//           >
//             <Typography
//               variant="h4"
//               component="h1"
//               textAlign="center"
//               mb={{ xs: 1, sm: 3 }}
//               sx={{ color: "var(--primary-color)", fontWeight: "bold" }}
//               fontSize={{
//                 xs: "1.5rem",
//                 sm: "2rem",
//               }}
//             >
//               {t("title")}
//             </Typography>

//             <TextField
//               label={t("newPassword")}
//               type="password"
//               fullWidth
//               margin="normal"
//               {...register("password", {
//                 required: t("passwordRequired"),
//                 minLength: { value: 6, message: t("passwordMinLength") },
//               })}
//               error={Boolean(errors.password)}
//               helperText={errors.password?.message}
//               sx={{ mb: 3 }}
//             />

//             <TextField
//               label={t("confirmPassword")}
//               type="password"
//               fullWidth
//               margin="normal"
//               {...register("confirmPassword", {
//                 required: t("confirmPasswordRequired"),
//                 validate: (value) =>
//                   value === watch("password") || t("passwordMismatch"),
//               })}
//               error={Boolean(errors.confirmPassword)}
//               helperText={errors.confirmPassword?.message}
//               sx={{ mb: 4 }}
//             />

//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth
//               sx={{
//                 py: 1.25,
//                 fontWeight: "bold",
//                 fontSize: "1.2rem",
//                 bgcolor: "var(--primary-color)",
//                 "&:hover": { bgcolor: "var(--primary-color)" },
//               }}
//               disabled={isLoading}
//               startIcon={
//                 isLoading && <CircularProgress size={20} color="inherit" />
//               }
//             >
//               {isLoading ? t("resetting") : t("resetButton")}
//             </Button>
//           </Box>
//         </Container>
//       </ThemeProvider>
//     </CacheProvider>
//   );
// }

// src/app/[locale]/auth/reset-password/page.jsx

"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useTranslations, useLocale } from "next-intl";
import toast from "react-hot-toast";

// استيراد مكونات MUI
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

// ❌ تم إزالة استيراد مكونات MUI Providers

import { resetPassword, clearState } from "@/store/auth";

export default function ResetPasswordPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { token } = useParams();
  const t = useTranslations("Auth.ResetPassword");
  const locale = useLocale();

  const { isLoading, error, message } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearState());
    }

    if (message) {
      toast.success(message);
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
      dispatch(clearState());
    }
  }, [error, message, dispatch, router]);

  const onSubmit = (data) => {
    dispatch(
      resetPassword({
        token,
        newPassword: data.password,
        confirmPassword: data.confirmPassword,
      })
    );
  };

  // ❌ تم إزالة أكواد الثيم والـ cache

  return (
    <div className="dark:bg-[#1c2737]">
      <Container
        maxWidth="sm"
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ width: "100%", p: 0 }}
        >
          <Typography
            variant="h4"
            component="h1"
            textAlign="center"
            mb={{ xs: 1, sm: 3 }}
            sx={{ color: "var(--primary-color)", fontWeight: "bold" }}
            fontSize={{
              xs: "1.5rem",
              sm: "2rem",
            }}
          >
            {t("title")}
          </Typography>

          <TextField
            label={t("newPassword")}
            type="password"
            fullWidth
            margin="normal"
            {...register("password", {
              required: t("passwordRequired"),
              minLength: { value: 6, message: t("passwordMinLength") },
            })}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            sx={{ mb: 3 }}
          />

          <TextField
            label={t("confirmPassword")}
            type="password"
            fullWidth
            margin="normal"
            {...register("confirmPassword", {
              required: t("confirmPasswordRequired"),
              validate: (value) =>
                value === watch("password") || t("passwordMismatch"),
            })}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword?.message}
            sx={{ mb: 4 }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              py: 1.25,
              fontWeight: "bold",
              fontSize: "1.2rem",
              bgcolor: "var(--primary-color)",
              "&:hover": { bgcolor: "var(--primary-color)" },
            }}
            disabled={isLoading}
            startIcon={
              isLoading && <CircularProgress size={20} color="inherit" />
            }
          >
            {isLoading ? t("resetting") : t("resetButton")}
          </Button>
        </Box>
      </Container>
    </div>
  );
}
