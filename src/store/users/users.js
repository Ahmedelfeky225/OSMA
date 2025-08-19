import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../interceptor/axiosInstance";

// جلب كل المستخدمين (Admin only)
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (params = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      // إضافة المعاملات للـ query
      Object.keys(params).forEach((key) => {
        if (
          params[key] !== undefined &&
          params[key] !== null &&
          params[key] !== ""
        ) {
          queryParams.append(key, params[key]);
        }
      });

      const response = await axiosInstance.get(
        `/users?${queryParams.toString()}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
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

// جلب المستخدم الحالي
// export const fetchCurrentUser = createAsyncThunk(
//   "users/fetchCurrentUser",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get("/auth/me", {
//         withCredentials: true,
//       });
//       return response.data;
//     } catch (error) {
//       if (error.response && error.response.data) {
//         return rejectWithValue(
//           error.response.data.message || error.response.data.error
//         );
//       }
//       return rejectWithValue(error.message);
//     }
//   }
// );

// جلب المستخدم الحالي
export const fetchCurrentUser = createAsyncThunk(
  "users/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/auth/me");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// جلب مستخدم واحد بالـ ID
export const fetchSingleUser = createAsyncThunk(
  "users/fetchSingleUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/users/${userId}`, {
        withCredentials: true,
      });
      return response.data.user || response.data;
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

// تحديث مستخدم
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/users/${userId}`, userData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data.user || response.data;
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

// حذف مستخدم
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/users/${userId}`, {
        withCredentials: true,
      });
      return { userId, message: response.data.message };
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

// إنشاء مستخدم جديد
export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/register", userData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data.user || response.data;
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

// البحث في المستخدمين
export const searchUsers = createAsyncThunk(
  "users/searchUsers",
  async (searchParams, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();

      // إضافة معاملات البحث
      if (searchParams.search) {
        queryParams.append("search", searchParams.search);
      }
      if (searchParams.role) {
        queryParams.append("role", searchParams.role);
      }
      if (searchParams.page) {
        queryParams.append("page", searchParams.page);
      }
      if (searchParams.limit) {
        queryParams.append("limit", searchParams.limit);
      }

      const response = await axiosInstance.get(
        `/users/search?${queryParams.toString()}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
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

const initialState = {
  users: [],
  currentUser: null,
  selectedUser: null,
  searchResults: [],
  isLoading: false,
  error: null,
  message: null,
  pagination: {
    totalUsers: 0,
    currentPage: 1,
    totalPages: 1,
    limit: 10,
  },
  filters: {
    search: "",
    role: "",
    sort: "newest",
  },
  searchLoading: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearState(state) {
      state.error = null;
      state.isLoading = false;
      state.message = null;
    },
    clearCurrentUser(state) {
      state.currentUser = null;
    },
    clearSelectedUser(state) {
      state.selectedUser = null;
    },
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters(state) {
      state.filters = initialState.filters;
    },
    clearSearchResults(state) {
      state.searchResults = [];
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setSearchLoading(state, action) {
      state.searchLoading = action.payload;
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchUsers
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.users || action.payload || [];
        state.pagination = {
          totalUsers: action.payload.totalUsers || action.payload.total || 0,
          currentPage: action.payload.currentPage || action.payload.page || 1,
          totalPages:
            action.payload.totalPages ||
            Math.ceil(
              (action.payload.totalUsers || action.payload.total || 0) /
                (action.payload.limit || 10)
            ),
          limit: action.payload.limit || 10,
        };
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "خطأ في جلب المستخدمين";
      })
      // fetchCurrentUser
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload.user || action.payload;
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "خطأ في جلب بيانات المستخدم";
      })
      // fetchSingleUser
      .addCase(fetchSingleUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSingleUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedUser = action.payload;
        state.error = null;
      })
      .addCase(fetchSingleUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "خطأ في جلب بيانات المستخدم";
      })
      // updateUser
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.users.findIndex(
          (u) => u._id === action.payload._id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        if (
          state.selectedUser &&
          state.selectedUser._id === action.payload._id
        ) {
          state.selectedUser = action.payload;
        }
        state.message = "تم تحديث المستخدم بنجاح";
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "خطأ في تحديث المستخدم";
      })
      // deleteUser
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = state.users.filter(
          (u) => u._id !== action.payload.userId
        );
        const newTotalUsers = Math.max(0, state.pagination.totalUsers - 1);
        state.pagination = {
          ...state.pagination,
          totalUsers: newTotalUsers,
          totalPages: Math.ceil(newTotalUsers / state.pagination.limit),
        };
        state.message = action.payload.message || "تم حذف المستخدم بنجاح";
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "خطأ في حذف المستخدم";
      })
      // createUser
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.pagination.currentPage === 1) {
          state.users.unshift(action.payload);
          // Keep only the limit number of users in the current page
          if (state.users.length > state.pagination.limit) {
            state.users = state.users.slice(0, state.pagination.limit);
          }
        }
        // Update pagination
        const newTotalUsers = state.pagination.totalUsers + 1;
        state.pagination = {
          ...state.pagination,
          totalUsers: newTotalUsers,
          totalPages: Math.ceil(newTotalUsers / state.pagination.limit),
        };
        state.message = "تم إنشاء المستخدم بنجاح";
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "خطأ في إنشاء المستخدم";
      })
      // searchUsers
      .addCase(searchUsers.pending, (state) => {
        state.searchLoading = true;
        state.error = null;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload.users || action.payload || [];
        state.error = null;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.searchLoading = false;
        state.error = action.payload || "خطأ في البحث";
      });
  },
});

export const {
  clearState,
  clearCurrentUser,
  clearSelectedUser,
  setFilters,
  clearFilters,
  clearSearchResults,
  setLoading,
  setSearchLoading,
  setCurrentUser,
} = usersSlice.actions;
export default usersSlice.reducer;
