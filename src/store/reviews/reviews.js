import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/store/interceptor/axiosInstance";

// Get all reviews for a product
export const getProductReviews = createAsyncThunk(
  "reviews/getProductReviews",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/products/${productId}/reviews`
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

// Add new review
export const addProductReview = createAsyncThunk(
  "reviews/addProductReview",
  async ({ productId, reviewData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/products/${productId}/reviews`,
        reviewData
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

// Delete review
export const deleteProductReview = createAsyncThunk(
  "reviews/deleteProductReview",
  async ({ productId, reviewId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/products/${productId}/reviews/${reviewId}`
      );
      return { reviewId, data: response.data };
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  reviews: [],
  isLoading: false,
  error: null,
  message: null,
  submitting: false,
  currentProductId: null,
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    clearState(state) {
      state.error = null;
      state.isLoading = false;
      state.message = null;
      state.submitting = false;
    },
    clearReviews(state) {
      state.reviews = [];
      state.currentProductId = null;
    },
    setCurrentProduct(state, action) {
      state.currentProductId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get reviews
      .addCase(getProductReviews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProductReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = Array.isArray(action.payload) ? action.payload : [];
        state.error = null;
      })
      .addCase(getProductReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "خطأ في تحميل التقييمات";
      })
      // Add review
      .addCase(addProductReview.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.message = null;
      })
      .addCase(addProductReview.fulfilled, (state, action) => {
        state.submitting = false;
        state.reviews.unshift(action.payload);
        state.message = "تم إضافة التقييم بنجاح";
        state.error = null;
      })
      .addCase(addProductReview.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload || "خطأ في إضافة التقييم";
      })
      // Delete review
      .addCase(deleteProductReview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProductReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = state.reviews.filter(
          (review) => review._id !== action.payload.reviewId
        );
        state.message = "تم حذف التقييم بنجاح";
        state.error = null;
      })
      .addCase(deleteProductReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "خطأ في حذف التقييم";
      });
  },
});

export const { clearState, clearReviews, setCurrentProduct } =
  reviewsSlice.actions;
export default reviewsSlice.reducer;
