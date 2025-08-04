import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../interceptor/axiosInstance";

// تسجيل الدخول
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", credentials, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

// تسجيل مستخدم جديد
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/register", userData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

// إعادة تعيين كلمة المرور
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, newPassword, confirmPassword }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/auth/reset-password/${token}`,
        { newPassword, confirmPassword },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

// طلب رابط إعادة تعيين كلمة المرور
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/auth/forgot-password",
        { email },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

// تسجيل الخروج
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/auth/logout",
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  message: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearState(state) {
      state.error = null;
      state.isLoading = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // loginUser
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user || null;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "خطأ في تسجيل الدخول";
      })

      // registerUser
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user || null;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "خطأ في التسجيل";
      })

      // resetPassword
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message || "تم تغيير كلمة المرور بنجاح";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "خطأ في إعادة تعيين كلمة المرور";
      })

      // forgotPassword
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message =
          action.payload.message ||
          "تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك";
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "خطأ في طلب إعادة تعيين كلمة المرور";
      })

      // logoutUser
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.error = null;
        state.message = "تم تسجيل الخروج بنجاح";
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "فشل تسجيل الخروج";
      });
  },
});

export const { clearState } = authSlice.actions;
export { loginUser, registerUser, resetPassword, forgotPassword, logoutUser };
export default authSlice.reducer;
