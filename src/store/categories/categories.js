import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../interceptor/axiosInstance";

// جلب كل التصنيفات
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/categories", {
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

const initialState = {
  categories: [],
  isLoading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearState(state) {
      state.error = null;
      state.isLoading = false;
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
        // الـ response مباشرة array من الـ categories
        state.categories = action.payload || [];
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "خطأ في جلب التصنيفات";
      });
  },
});

export const { clearState } = categoriesSlice.actions;
export default categoriesSlice.reducer;
