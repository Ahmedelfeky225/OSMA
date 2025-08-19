"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearState } from "@/store/auth";
import { setCurrentUser } from "@/store/users/users"; // ✅ صححت المسار

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { useTranslations, useLocale } from "next-intl";

//ok
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
  Link as MuiLink, // Changed the alias for clarity
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import NextLink from "next/link";
import toast from "react-hot-toast";

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
  // const locale = useLocale();

  // const { isLoading } = useSelector((state) => state.auth);

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
      // ✅ احفظ اليوزر في Redux
      if (result.payload?.user) {
        dispatch(setCurrentUser(result.payload.user));
      }

      // ✅ خزّن الـ token في الكوكي
      if (result.payload?.token) {
        Cookies.set("token", result.payload.token, {
          expires: 7, // 7 أيام
          path: "/", // متاح في كل الصفحات
        });
      }

      toast.success(t("loginSuccess"));
      reset();
      dispatch(clearState());
      router.push("/");
    }

    if (loginUser.rejected.match(result)) {
      toast.error(result.payload || t("loginFailed"));
    }
  };

  return (
    <div className="dark:bg-[#1c2737]">
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

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
            fontSize={14}
          >
            <MuiLink
              component={NextLink}
              href="/auth/register"
              underline="hover"
              sx={{ color: "var(--color-tex)", fontWeight: "bold" }}
            >
              {t("registerLink")}
            </MuiLink>
            <MuiLink
              component={NextLink}
              href="/auth/reset-password"
              underline="hover"
              sx={{ color: "var(--color-tex)", fontWeight: "bold" }}
            >
              {t("forgotPassword")}
            </MuiLink>
          </Stack>
        </Box>
      </Container>
    </div>
  );
}
