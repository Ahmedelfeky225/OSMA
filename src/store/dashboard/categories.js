import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/store/interceptor/axiosInstance";

export const fetchCategories = createAsyncThunk(
  "dashboard/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/categories", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addCategory = createAsyncThunk(
  "dashboard/addCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/categories", categoryData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "dashboard/updateCategory",
  async ({ id, categoryData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/categories/${id}`,
        categoryData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "dashboard/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/categories/${id}`, {
        withCredentials: true,
      });
      return { id, message: response.data.message };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(addCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.categories.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) state.categories[index] = action.payload;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = state.categories.filter(
          (c) => c.id !== action.payload.id
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = categoriesSlice.actions;
export default categoriesSlice.reducer;
