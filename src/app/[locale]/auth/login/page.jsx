// // src/app/[locale]/auth/login/page.jsx

// "use client";

// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser, clearState } from "@/store/auth";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";

// import { useForm } from "react-hook-form";
// import { useTranslations, useLocale } from "next-intl";

// // MUI imports
// import {
//   Box,
//   Button,
//   Container,
//   TextField,
//   Typography,
//   Link,
//   Stack,
//   CircularProgress,
//   IconButton,
//   InputAdornment,
// } from "@mui/material";

// import { Visibility, VisibilityOff } from "@mui/icons-material";

// export default function LoginPage() {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const t = useTranslations("Auth.Login");
//   const locale = useLocale();

//   const { isLoading } = useSelector((state) => state.auth);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const [showPassword, setShowPassword] = useState(false);
//   const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

//   // ✅ تعديل دالة onSubmit
//   const onSubmit = async (data) => {
//     // ❌ إزالة event.preventDefault() لأن handleSubmit تتولاه
//     const result = await dispatch(loginUser(data));

//     if (loginUser.fulfilled.match(result)) {
//       // toast.success(t("loginSuccess"));
//       reset();
//       dispatch(clearState());
//       // ✅ استخدام router.replace() لمنع العودة إلى صفحة الدخول
//       router.push(`/${locale}`);
//     } else {
//       // التعامل مع الخطأ مباشرة من result.payload
//       // toast.error(result.payload || t("loginFailed"));
//     }
//   };

//   return (
//     <div className="dark:bg-[#1c2737]">
//       <Container
//         maxWidth="sm"
//         sx={{
//           minHeight: "100vh",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           px: 2,
//         }}
//       >
//         <Box
//           component="form"
//           autoComplete="off" // ✅ مهم جدا لمنع المتصفح من إكمال الحقول
//           onSubmit={handleSubmit(onSubmit)}
//           sx={{ bgcolor: "transparent", p: 0, width: "100%" }}
//         >
//           <Typography
//             variant="h4"
//             component="h1"
//             textAlign="center"
//             mb={{ xs: 1, sm: 3 }}
//             sx={{ color: "var(--color-tex)", fontWeight: "bold" }}
//             fontSize={{ xs: "1.8rem", sm: "2.2rem" }}
//           >
//             {t("title")}
//           </Typography>

//           {/* Email Field */}
//           <TextField
//             label={t("email")}
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             autoComplete="new-email" // ✅ مهم جدا لمنع المتصفح من إكمال حقل البريد
//             {...register("email", {
//               required: t("emailRequired"),
//               pattern: {
//                 value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//                 message: t("emailInvalid"),
//               },
//             })}
//             error={Boolean(errors.email)}
//             helperText={errors.email?.message}
//             // The InputLabelProps and sx for the input itself are already configured correctly
//             InputLabelProps={{ sx: { color: "var(--color-tex)" } }}
//             sx={{
//               "& .MuiOutlinedInput-root": {
//                 "& fieldset": { borderColor: "var(--color-tex)" },
//                 "&:hover fieldset": { borderColor: "var(--color-tex)" },
//                 "&.Mui-focused fieldset": {
//                   borderColor: "var(--color-tex)",
//                 },
//                 input: {
//                   fontSize: "1rem",
//                   color: "var(--color-tex)", // 💡 Added color for the input text
//                 },
//               },
//               mb: 3,
//             }}
//           />

//           {/* Password Field */}
//           <TextField
//             label={t("password")}
//             variant="outlined"
//             type={showPassword ? "text" : "password"}
//             fullWidth
//             margin="normal"
//             autoComplete="new-password" // ✅ مهم جدا لإخبار المتصفح بأنها كلمة مرور جديدة
//             {...register("password", {
//               required: t("passwordRequired"),
//               minLength: { value: 6, message: t("passwordMinLength") },
//             })}
//             error={Boolean(errors.password)}
//             helperText={errors.password?.message}
//             // The InputLabelProps and sx for the input itself are already configured correctly
//             InputLabelProps={{ sx: { color: "var(--color-tex)" } }}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     onClick={togglePasswordVisibility}
//                     edge="end"
//                     sx={{ color: "var(--color-tex)" }}
//                   >
//                     {" "}
//                     {/* 💡 Added color for the icon button */}
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//             sx={{
//               "& .MuiOutlinedInput-root": {
//                 "& fieldset": { borderColor: "var(--color-tex)" },
//                 "&:hover fieldset": { borderColor: "var(--color-tex)" },
//                 "&.Mui-focused fieldset": {
//                   borderColor: "var(--color-tex)",
//                 },
//                 input: {
//                   fontSize: "1rem",
//                   color: "var(--color-tex)", // 💡 Added color for the input text
//                 },
//               },
//               mb: 5,
//             }}
//           />

//           <Button
//             type="submit"
//             variant="contained"
//             fullWidth
//             sx={{
//               py: 1.25,
//               fontWeight: "bold",
//               fontSize: "1.25rem",
//               bgcolor: "var(--color-tex)",
//               "&:hover": { bgcolor: "var(--color-tex)" },
//             }}
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <CircularProgress size={24} color="inherit" />
//             ) : (
//               t("loginButton")
//             )}
//           </Button>

//           <Stack
//             direction="row"
//             justifyContent="space-between"
//             alignItems="center"
//             mt={2}
//             fontSize={14}
//           >
//             <Link
//               href="/auth/register"
//               underline="hover"
//               sx={{
//                 color: "var(--color-tex)",
//                 fontWeight: "bold",
//                 cursor: "pointer",
//               }}
//             >
//               {t("registerLink")}
//             </Link>
//             <Link
//               href="/auth/reset-password"
//               underline="hover"
//               sx={{
//                 color: "var(--color-tex)",
//                 fontWeight: "bold",
//                 cursor: "pointer",
//               }}
//             >
//               {t("forgotPassword")}
//             </Link>
//           </Stack>
//         </Box>
//       </Container>
//     </div>
//   );
// }

// src/app/[locale]/auth/login/page.jsx

"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearState } from "@/store/auth";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { useTranslations, useLocale } from "next-intl";

// MUI imports
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Stack,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import NextLink from "next/link";

// Dynamic import for react-hot-toast (client-only)
const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  {
    ssr: false,
  }
);

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const t = useTranslations("Auth.Login");
  const locale = useLocale();

  const { isLoading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const onSubmit = async (data) => {
    const result = await dispatch(loginUser(data));

    if (loginUser.fulfilled.match(result)) {
      reset();
      dispatch(clearState());
      router.push(`/${locale}`);
      // toast can be used here safely
      // toast.success(t("loginSuccess"));
    } else {
      // toast.error(result.payload || t("loginFailed"));
    }
  };

  return (
    <div className="dark:bg-[#1c2737]">
      {/* Toast container */}
      <Toaster />

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
          sx={{ bgcolor: "transparent", p: 0, width: "100%" }}
        >
          <Typography
            variant="h4"
            component="h1"
            textAlign="center"
            mb={{ xs: 1, sm: 3 }}
            sx={{ color: "var(--color-tex)", fontWeight: "bold" }}
            fontSize={{ xs: "1.8rem", sm: "2.2rem" }}
          >
            {t("title")}
          </Typography>

          {/* Email Field */}
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
            InputLabelProps={{ sx: { color: "var(--color-tex)" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "var(--color-tex)" },
                "&:hover fieldset": { borderColor: "var(--color-tex)" },
                "&.Mui-focused fieldset": { borderColor: "var(--color-tex)" },
                input: { fontSize: "1rem", color: "var(--color-tex)" },
              },
              mb: 3,
            }}
          />

          {/* Password Field */}
          <TextField
            label={t("password")}
            variant="outlined"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            autoComplete="new-password"
            {...register("password", {
              required: t("passwordRequired"),
              minLength: { value: 6, message: t("passwordMinLength") },
            })}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            InputLabelProps={{ sx: { color: "var(--color-tex)" } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={togglePasswordVisibility}
                    edge="end"
                    sx={{ color: "var(--color-tex)" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "var(--color-tex)" },
                "&:hover fieldset": { borderColor: "var(--color-tex)" },
                "&.Mui-focused fieldset": { borderColor: "var(--color-tex)" },
                input: { fontSize: "1rem", color: "var(--color-tex)" },
              },
              mb: 5,
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              py: 1.25,
              fontWeight: "bold",
              fontSize: "1.25rem",
              bgcolor: "var(--color-tex)",
              "&:hover": { bgcolor: "var(--color-tex)" },
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              t("loginButton")
            )}
          </Button>

          {/* <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
            fontSize={14}
          >
            <NextLink href="/auth/register" passHref legacyBehavior>
              <a style={{ color: "var(--color-tex)", fontWeight: "bold" }}>
                {t("registerLink")}
              </a>
            </NextLink>
            <NextLink href="/auth/reset-password" passHref legacyBehavior>
              <a style={{ color: "var(--color-tex)", fontWeight: "bold" }}>
                {t("forgotPassword")}
              </a>
            </NextLink>
          </Stack> */}
        </Box>
      </Container>
    </div>
  );
}
