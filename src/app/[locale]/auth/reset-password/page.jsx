"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearState } from "@/store/auth";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

import { useForm } from "react-hook-form";

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";

export default function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const t = useTranslations("Auth.ForgotPassword");

  const { isLoading, error, message } = useSelector((state) => state.auth);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
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
          mb={3}
          sx={{ color: "#0b9add", fontWeight: "bold" }}
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
          startIcon={
            isLoading && <CircularProgress size={20} color="inherit" />
          }
        >
          {isLoading ? t("sending") : t("sendResetLink")}
        </Button>
      </Box>
    </Container>
  );
}
