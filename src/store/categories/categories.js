import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../interceptor/axiosInstance";

// جلب كل الفئات
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (params = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
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
        `/categories?${queryParams.toString()}`,
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

export const fetchSingleCategory = createAsyncThunk(
  "categories/fetchSingleCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/categories/${categoryId}`, {
        withCredentials: true,
      });
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

// إنشاء فئة جديدة
export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/categories", categoryData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
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

// تحديث فئة
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ categoryId, categoryData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/categories/${categoryId}`,
        categoryData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
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

// حذف فئة
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/categories/${categoryId}`, {
        withCredentials: true,
      });
      return { categoryId, message: response.data.message };
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
  categories: [],
  currentCategory: null, // إضافة currentCategory المفقود
  isLoading: false,
  error: null,
  message: null,
  pagination: {
    total: 0,
    currentPage: 1,
    totalPages: 1,
  },
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearState(state) {
      state.error = null;
      state.isLoading = false;
      state.message = null;
    },
    clearCurrentCategory(state) {
      state.currentCategory = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCategories
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload.categories || action.payload;
        state.pagination = {
          total: action.payload.total || 0,
          currentPage: action.payload.currentPage || 1,
          totalPages: action.payload.totalPages || 1,
        };
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "خطأ في جلب الفئات";
      })
      .addCase(fetchSingleCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSingleCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentCategory = action.payload;
        state.error = null;
      })
      .addCase(fetchSingleCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "خطأ في جلب الفئة";
      })
      // createCategory
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories.unshift(action.payload);
        state.message = "تم إنشاء الفئة بنجاح";
        state.error = null;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "خطأ في إنشاء الفئة";
      })
      // updateCategory
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.categories.findIndex(
          (c) => c._id === action.payload._id
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
        state.currentCategory = action.payload;
        state.message = "تم تحديث الفئة بنجاح";
        state.error = null;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "خطأ في تحديث الفئة";
      })
      // deleteCategory
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = state.categories.filter(
          (c) => c._id !== action.payload.categoryId
        );
        state.message = action.payload.message || "تم حذف الفئة بنجاح";
        state.error = null;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "خطأ في حذف الفئة";
      });
  },
});

export const { clearState, clearCurrentCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
