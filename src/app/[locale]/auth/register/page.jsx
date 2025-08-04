"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearState } from "@/store/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
  Stack,
  CircularProgress,
  IconButton,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const t = useTranslations("Auth.Register");

  const { isLoading } = useSelector((state) => state.auth);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    const result = await dispatch(registerUser({ ...data, role: "user" }));
    if (registerUser.fulfilled.match(result)) {
      toast.success(t("registerSuccess"));
      reset();
      router.push("/auth/login");
      router.refresh();
      dispatch(clearState());
    } else {
      toast.error(result.payload || t("registerFailed"));
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: isMobile ? 1.5 : 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        sx={{
          bgcolor: "transparent",
          p: 4,
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          textAlign="center"
          mb={2}
          sx={{ color: "#0b9add", fontWeight: "bold" }}
        >
          {t("title")}
        </Typography>

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
          InputLabelProps={{ sx: { color: "#0b9add" } }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#0b9add" },
              "&:hover fieldset": { borderColor: "#0b9add" },
              "&.Mui-focused fieldset": { borderColor: "#0b9add" },
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
            minLength: {
              value: 6,
              message: t("passwordMinLength"),
            },
          })}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          InputLabelProps={{ sx: { color: "#0b9add" } }}
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
              "& fieldset": { borderColor: "#0b9add" },
              "&:hover fieldset": { borderColor: "#0b9add" },
              "&.Mui-focused fieldset": { borderColor: "#0b9add" },
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
            bgcolor: "#0b9add",
            "&:hover": { bgcolor: "#3e7dd6" },
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            t("registerButton")
          )}
        </Button>

        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          mt={2}
          fontSize={14}
        >
          <Link
            href="/auth/login"
            underline="hover"
            sx={{ color: "#0b9adda9", fontWeight: "bold", cursor: "pointer" }}
          >
            {t("loginLink")}
          </Link>
        </Stack>
      </Box>
    </Container>
  );
}
