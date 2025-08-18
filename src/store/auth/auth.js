import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../lib/axiosInstance";
import { fetchCurrentUser, clearCurrentUser } from "@/store/users/users";

// ✅ استيراد مكتبة js-cookie
import Cookies from "js-cookie";

// تسجيل الدخول
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      // ✅ نغير الطريقة: نستقبل الـ response
      const response = await axiosInstance.post("/auth/login", credentials);
      const { token, user } = response.data;

      if (token) {
        // حفظ في cookies
        Cookies.set("token", token, {
          expires: 7, // 7 أيام
          secure: process.env.NODE_ENV === "production", // secure فقط في production
          sameSite: "Lax", // عشان تشتغل في الـ middleware
        });

        // حفظ في localStorage كبديل احتياطي
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        console.log("[v0] authSlice - Token saved:", {
          cookieSaved: !!Cookies.get("token"),
          localStorageSaved: !!localStorage.getItem("token"),
          tokenPreview: token.substring(0, 20) + "...",
        });
      }

      // ✅ بما إننا بنستخدم كوكي عادية، لازم نرجعها مع الـ user
      await dispatch(fetchCurrentUser());
      return { message: "تم تسجيل الدخول بنجاح" };
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(
          error.response.data.message || error.response.data.error
        );
      }
      return rejectWithValue(error.message);
    }
  }
);

// تسجيل مستخدم جديد
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/register", userData);
      const { token, user } = response.data;

      if (token) {
        Cookies.set("token", token, {
          expires: 7,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Lax",
        });

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        console.log("[v0] authSlice - Registration token saved:", {
          cookieSaved: !!Cookies.get("token"),
          localStorageSaved: !!localStorage.getItem("token"),
        });
      }

      await dispatch(fetchCurrentUser());
      return { message: "تم التسجيل بنجاح" };
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(
          error.response.data.message || error.response.data.error
        );
      }
      return rejectWithValue(error.message);
    }
  }
);

// تسجيل الخروج
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      // ✅ مافيش حاجة هتتبعت، التوكن هيتشال من الـ client
      await axiosInstance.post("/auth/logout");

      Cookies.remove("token");
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      console.log("[v0] authSlice - Tokens cleared on logout");

      dispatch(clearCurrentUser());
      return { message: "تم تسجيل الخروج بنجاح" };
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
        { newPassword, confirmPassword }
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
      const response = await axiosInstance.post("/auth/forgot-password", {
        email,
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

export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuthStatus",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const cookieToken = Cookies.get("token");
      const localToken = localStorage.getItem("token");
      const token = cookieToken || localToken;

      console.log("[v0] authSlice - checkAuthStatus:", {
        cookieToken: cookieToken ? "exists" : "null",
        localToken: localToken ? "exists" : "null",
        finalToken: token ? "exists" : "null",
      });

      if (token) {
        // Verify token with backend and get current user
        await dispatch(fetchCurrentUser());
        return { isAuthenticated: true };
      }

      return { isAuthenticated: false };
    } catch (error) {
      console.log("[v0] authSlice - checkAuthStatus failed:", error.message);
      Cookies.remove("token");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch(clearCurrentUser());
      return rejectWithValue("Authentication failed");
    }
  }
);

const initialState = {
  isLoading: false,
  error: null,
  message: null,
  isAuthenticated: false,
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
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
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
        state.message = action.payload?.message;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "خطأ في تسجيل الدخول";
        state.isAuthenticated = false;
      })

      // registerUser
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload?.message;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "خطأ في التسجيل";
        state.isAuthenticated = false;
      })

      .addCase(checkAuthStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.isAuthenticated;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })

      // logoutUser
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload?.message;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "فشل تسجيل الخروج";
        state.isAuthenticated = false;
      });
  },
});

export const { clearState, setAuthenticated } = authSlice.actions;
export default authSlice.reducer;
