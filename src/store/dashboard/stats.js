import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/store/interceptor/axiosInstance";

export const fetchStats = createAsyncThunk(
  "dashboard/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/stats", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const statsSlice = createSlice({
  name: "stats",
  initialState: {
    data: null,
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default statsSlice.reducer;
