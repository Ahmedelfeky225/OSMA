// "use client";

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { forgotPassword, clearState } from "@/store/auth";
// import { useTranslations, useLocale } from "next-intl"; // ✅ استيراد useLocale
// import toast from "react-hot-toast";

// import { useForm } from "react-hook-form";

// // استيراد مكونات MUI
// import {
//   Box,
//   Button,
//   Container,
//   TextField,
//   Typography,
//   CircularProgress,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";

// // استيراد مكونات MUI Providers
// import { CacheProvider } from "@emotion/react";
// import createCache from "@emotion/cache";
// import { prefixer } from "stylis";
// import rtlPlugin from "stylis-plugin-rtl";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";

// export default function ForgotPasswordPage() {
//   const dispatch = useDispatch();
//   const t = useTranslations("Auth.ForgotPassword");
//   const locale = useLocale(); // ✅ الحصول على اللغة الحالية

//   const { isLoading, error, message } = useSelector((state) => state.auth);

//   const muiTheme = useTheme();
//   const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(clearState());
//     }
//     if (message) {
//       toast.success(message);
//       dispatch(clearState());
//     }
//   }, [error, message, dispatch]);

//   const onSubmit = (data) => {
//     dispatch(forgotPassword(data.email));
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
//             px: 2,
//           }}
//         >
//           <Box
//             component="form"
//             autoComplete="off"
//             onSubmit={handleSubmit(onSubmit)}
//             sx={{
//               bgcolor: "transparent",
//               p: 0,
//               width: "100%",
//             }}
//           >
//             <Typography
//               variant="h4"
//               component="h1"
//               textAlign="center"
//               mb={{
//                 xs: 1,
//                 sm: 3,
//               }}
//               sx={{ color: "var(--primary-color)", fontWeight: "bold" }}
//               fontSize={{
//                 xs: "1.5rem",
//                 sm: "2rem",
//               }}
//             >
//               {t("title")}
//             </Typography>

//             <TextField
//               label={t("email")}
//               variant="outlined"
//               fullWidth
//               margin="normal"
//               autoComplete="new-email"
//               {...register("email", {
//                 required: t("emailRequired"),
//                 pattern: {
//                   value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//                   message: t("emailInvalid"),
//                 },
//               })}
//               error={Boolean(errors.email)}
//               helperText={errors.email?.message}
//               InputLabelProps={{ sx: { color: "var(--primary-color)" } }}
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   "& fieldset": { borderColor: "var(--primary-color)" },
//                   "&:hover fieldset": { borderColor: "var(--primary-color)" },
//                   "&.Mui-focused fieldset": {
//                     borderColor: "var(--primary-color)",
//                   },
//                   input: { fontSize: "1rem" },
//                 },
//                 mb: 3,
//               }}
//             />

//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth
//               sx={{
//                 py: 1.25,
//                 fontWeight: "bold",
//                 fontSize: "1.15rem",
//                 bgcolor: "var(--primary-color)",
//                 "&:hover": { bgcolor: "var(--primary-color)" },
//               }}
//               disabled={isLoading}
//               startIcon={
//                 isLoading && <CircularProgress size={20} color="inherit" />
//               }
//             >
//               {isLoading ? t("sending") : t("sendResetLink")}
//             </Button>
//           </Box>
//         </Container>
//       </ThemeProvider>
//     </CacheProvider>
//   );
// }

// src/app/[locale]/auth/forgot-password/page.jsx

"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearState } from "@/store/auth";
import { useTranslations, useLocale } from "next-intl";
import toast from "react-hot-toast";

import { useForm } from "react-hook-form";

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

export default function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const t = useTranslations("Auth.ForgotPassword");
  const locale = useLocale();

  const { isLoading, error, message } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearState());
    }
    if (message) {
      toast.success(message);
      dispatch(clearState());
    }
  }, [error, message, dispatch]);

  const onSubmit = (data) => {
    dispatch(forgotPassword(data.email));
  };

  // ❌ تم إزالة أكواد الثيم والـ cache
  // ❌ تم إزالة استخدام useMediaQuery و useTheme

  return (
    <div className="dark:bg-[#1c2737]">
      <Container
        maxWidth="sm"
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
        }}
      >
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            bgcolor: "transparent",
            p: 0,
            width: "100%",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            textAlign="center"
            mb={{
              xs: 1,
              sm: 3,
            }}
            sx={{ color: "var(--primary-color)", fontWeight: "bold" }}
            fontSize={{
              xs: "1.5rem",
              sm: "2rem",
            }}
          >
            {t("title")}
          </Typography>

          <TextField
            label={t("email")}
            variant="outlined"
            fullWidth
            margin="normal"
            autoComplete="new-email"
            {...register("email", {
              required: t("emailRequired"),
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: t("emailInvalid"),
              },
            })}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            InputLabelProps={{ sx: { color: "var(--primary-color)" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "var(--primary-color)" },
                "&:hover fieldset": { borderColor: "var(--primary-color)" },
                "&.Mui-focused fieldset": {
                  borderColor: "var(--primary-color)",
                },
                input: { fontSize: "1rem" },
              },
              mb: 3,
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              py: 1.25,
              fontWeight: "bold",
              fontSize: "1.15rem",
              bgcolor: "var(--primary-color)",
              "&:hover": { bgcolor: "var(--primary-color)" },
            }}
            disabled={isLoading}
            startIcon={
              isLoading && <CircularProgress size={20} color="inherit" />
            }
          >
            {isLoading ? t("sending") : t("sendResetLink")}
          </Button>
        </Box>
      </Container>
    </div>
  );
}
