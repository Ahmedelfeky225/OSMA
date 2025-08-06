"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

import { resetPassword, clearState } from "@/store/auth";

export default function ResetPasswordPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { token } = useParams();
  const t = useTranslations("Auth.ResetPassword");

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
  return (
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
  );
}
