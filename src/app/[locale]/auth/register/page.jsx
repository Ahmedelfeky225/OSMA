// // src/app/[locale]/auth/register/page.jsx

// "use client";

// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { registerUser, clearState } from "@/store/auth";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import { useForm } from "react-hook-form";
// import { useTranslations, useLocale } from "next-intl";

// // استيراد مكونات MUI
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
//   // useMediaQuery, // ✅ تم إزالتها
//   // useTheme, // ✅ تم إزالتها
// } from "@mui/material";

// import { Visibility, VisibilityOff } from "@mui/icons-material";

// // ❌ تم إزالة استيراد مكونات MUI Providers

// export default function RegisterPage() {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const t = useTranslations("Auth.Register");
//   const locale = useLocale();

//   const { isLoading } = useSelector((state) => state.auth);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const [showPassword, setShowPassword] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword((prev) => !prev);
//   };

//   const onSubmit = async (data) => {
//     const result = await dispatch(registerUser({ ...data, role: "user" }));
//     if (registerUser.fulfilled.match(result)) {
//       toast.success(t("registerSuccess"));
//       reset();
//       router.push(`/auth/login`);
//       router.refresh();
//       dispatch(clearState());
//     } else {
//       toast.error(result.payload || t("registerFailed"));
//     }
//   };

//   // ❌ تم إزالة أكواد الثيم والـ cache

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
//           onSubmit={handleSubmit(onSubmit)}
//           autoComplete="off"
//           sx={{
//             bgcolor: "transparent",
//             p: 0,
//             width: "100%",
//           }}
//         >
//           <Typography
//             variant="h4"
//             component="h1"
//             textAlign="center"
//             mb={{ xs: 1, sm: 3 }}
//             sx={{ color: "var(--primary-color)", fontWeight: "bold" }}
//             fontSize={{
//               xs: "1.8rem",
//               sm: "2.2rem",
//             }}
//           >
//             {t("title")}
//           </Typography>

//           <TextField
//             label={t("name")}
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             autoComplete="name"
//             {...register("name", {
//               required: t("nameRequired"),
//             })}
//             error={Boolean(errors.name)}
//             helperText={errors.name?.message}
//             InputLabelProps={{ sx: { color: "var(--primary-color)" } }}
//             sx={{
//               "& .MuiOutlinedInput-root": {
//                 "& fieldset": { borderColor: "var(--primary-color)" },
//                 "&:hover fieldset": { borderColor: "var(--primary-color)" },
//                 "&.Mui-focused fieldset": {
//                   borderColor: "var(--primary-color)",
//                 },
//                 input: { fontSize: "1rem" },
//               },
//               mb: 3,
//             }}
//           />

//           <TextField
//             label={t("email")}
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             autoComplete="email"
//             {...register("email", {
//               required: t("emailRequired"),
//               pattern: {
//                 value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//                 message: t("emailInvalid"),
//               },
//             })}
//             error={Boolean(errors.email)}
//             helperText={errors.email?.message}
//             InputLabelProps={{ sx: { color: "var(--primary-color)" } }}
//             sx={{
//               "& .MuiOutlinedInput-root": {
//                 "& fieldset": { borderColor: "var(--primary-color)" },
//                 "&:hover fieldset": { borderColor: "var(--primary-color)" },
//                 "&.Mui-focused fieldset": {
//                   borderColor: "var(--primary-color)",
//                 },
//                 input: { fontSize: "1rem" },
//               },
//               mb: 3,
//             }}
//           />

//           <TextField
//             label={t("password")}
//             variant="outlined"
//             type={showPassword ? "text" : "password"}
//             fullWidth
//             margin="normal"
//             autoComplete="new-password"
//             {...register("password", {
//               required: t("passwordRequired"),
//               minLength: {
//                 value: 6,
//                 message: t("passwordMinLength"),
//               },
//             })}
//             error={Boolean(errors.password)}
//             helperText={errors.password?.message}
//             InputLabelProps={{ sx: { color: "var(--primary-color)" } }}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton onClick={togglePasswordVisibility} edge="end">
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//             sx={{
//               "& .MuiOutlinedInput-root": {
//                 "& fieldset": { borderColor: "var(--primary-color)" },
//                 "&:hover fieldset": { borderColor: "var(--primary-color)" },
//                 "&.Mui-focused fieldset": {
//                   borderColor: "var(--primary-color)",
//                 },
//                 input: { fontSize: "1rem" },
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
//               bgcolor: "var(--primary-color)",
//               "&:hover": { bgcolor: "var(--primary-color)" },
//             }}
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <CircularProgress size={24} color="inherit" />
//             ) : (
//               t("registerButton")
//             )}
//           </Button>

//           {/* <Stack
//             direction="row"
//             justifyContent="center"
//             alignItems="center"
//             mt={2}
//             fontSize={14}
//           >
//             <Link
//               href="/auth/login"
//               underline="hover"
//               sx={{
//                 color: "var(--primary-color)",
//                 fontWeight: "bold",
//                 cursor: "pointer",
//               }}
//             >
//               {t("loginLink")}
//             </Link>
//           </Stack> */}
//         </Box>
//       </Container>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearState } from "@/store/auth";
import { setCurrentUser } from "@/store/users/users";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import Cookies from "js-cookie";

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const t = useTranslations("Auth.Register");

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
    const result = await dispatch(registerUser({ ...data, role: "user" }));

    if (registerUser.fulfilled.match(result)) {
      // ✅ حفظ الـ user في Redux
      if (result.payload?.user) {
        dispatch(setCurrentUser(result.payload.user));
      }

      // ✅ حفظ التوكن في Cookies و localStorage
      if (result.payload?.token) {
        Cookies.set("token", result.payload.token, {
          expires: 7,
          path: "/",
        });
        localStorage.setItem("token", result.payload.token);
      }

      toast.success(t("registerSuccess"));
      reset();
      dispatch(clearState());
      router.push(`/auth/login`);
      router.refresh();
    }

    if (registerUser.rejected.match(result)) {
      toast.error(result.payload || t("registerFailed"));
    }
  };

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
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          sx={{ bgcolor: "transparent", p: 0, width: "100%" }}
        >
          <Typography
            variant="h4"
            component="h1"
            textAlign="center"
            mb={{ xs: 1, sm: 3 }}
            sx={{ color: "var(--primary-color)", fontWeight: "bold" }}
            fontSize={{ xs: "1.8rem", sm: "2.2rem" }}
          >
            {t("title")}
          </Typography>

          <TextField
            label={t("name")}
            variant="outlined"
            fullWidth
            margin="normal"
            autoComplete="name"
            {...register("name", { required: t("nameRequired") })}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
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

          <TextField
            label={t("email")}
            variant="outlined"
            fullWidth
            margin="normal"
            autoComplete="email"
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
            InputLabelProps={{ sx: { color: "var(--primary-color)" } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "var(--primary-color)" },
                "&:hover fieldset": { borderColor: "var(--primary-color)" },
                "&.Mui-focused fieldset": {
                  borderColor: "var(--primary-color)",
                },
                input: { fontSize: "1rem" },
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
              bgcolor: "var(--primary-color)",
              "&:hover": { bgcolor: "var(--primary-color)" },
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              t("registerButton")
            )}
          </Button>
        </Box>
      </Container>
    </div>
  );
}
