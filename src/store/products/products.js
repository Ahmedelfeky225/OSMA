// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../interceptor/axiosInstance";

// // جلب كل المنتجات
// export const fetchProducts = createAsyncThunk(
//   "products/fetchProducts",
//   async (params = {}, { rejectWithValue }) => {
//     try {
//       const queryParams = new URLSearchParams();
//       // إضافة المعاملات للـ query
//       Object.keys(params).forEach((key) => {
//         if (
//           params[key] !== undefined &&
//           params[key] !== null &&
//           params[key] !== ""
//         ) {
//           queryParams.append(key, params[key]);
//         }
//       });
//       const response = await axiosInstance.get(
//         `/products?${queryParams.toString()}`,
//         {
//           withCredentials: true,
//         }
//       );
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

// // جلب منتج واحد
// export const fetchSingleProduct = createAsyncThunk(
//   "products/fetchSingleProduct",
//   async (productId, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get(`/products/${productId}`, {
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

// // إنشاء منتج جديد
// export const createProduct = createAsyncThunk(
//   "products/createProduct",
//   async (productData, { rejectWithValue }) => {
//     try {
//       const formData = new FormData();
//       // إضافة البيانات النصية
//       Object.keys(productData).forEach((key) => {
//         if (key === "notes") {
//           // تحويل كائن الملاحظات إلى JSON string
//           formData.append("notes", JSON.stringify(productData[key]));
//         } else if (key !== "images" && productData[key] !== undefined) {
//           formData.append(key, productData[key]);
//         }
//       });
//       // إضافة الصور
//       if (productData.images && productData.images.length > 0) {
//         productData.images.forEach((image) => {
//           formData.append("images", image);
//         });
//       }
//       const response = await axiosInstance.post("/products", formData, {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
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

// // تحديث منتج
// export const updateProduct = createAsyncThunk(
//   "products/updateProduct",
//   async ({ productId, productData }, { rejectWithValue }) => {
//     try {
//       const formData = new FormData();
//       const existingImages = [];
//       const newImages = [];

//       // فصل الصور الموجودة عن الصور الجديدة
//       if (productData.images && productData.images.length > 0) {
//         productData.images.forEach((image) => {
//           if (image instanceof File) {
//             newImages.push(image);
//           } else {
//             existingImages.push(image); // هذه هي الـ URLs للصور الموجودة
//           }
//         });
//       }

//       // إضافة البيانات النصية
//       Object.keys(productData).forEach((key) => {
//         if (key === "images") {
//           // لا تفعل شيئًا هنا، سيتم التعامل مع الصور بشكل منفصل
//         } else if (key === "notes") {
//           // تحويل كائن الملاحظات إلى JSON string
//           formData.append("notes", JSON.stringify(productData[key]));
//         } else if (productData[key] !== undefined) {
//           formData.append(key, productData[key]);
//         }
//       });

//       // إضافة الصور الجديدة
//       newImages.forEach((image) => {
//         formData.append("images", image);
//       });

//       // إضافة الصور الموجودة (URLs) كحقل منفصل إذا كانت الواجهة الخلفية تتوقع ذلك
//       // أو يمكنك دمجها في حقل 'images' إذا كانت الواجهة الخلفية تتعامل مع كليهما
//       // هنا نفترض أن الواجهة الخلفية تتوقعها كـ 'existingImages'
//       if (existingImages.length > 0) {
//         formData.append("existingImages", JSON.stringify(existingImages));
//       }

//       const response = await axiosInstance.put(
//         `/products/${productId}`,
//         formData,
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
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

// // حذف منتج
// export const deleteProduct = createAsyncThunk(
//   "products/deleteProduct",
//   async (productId, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.delete(`/products/${productId}`, {
//         withCredentials: true,
//       });
//       return { productId, message: response.data.message };
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

// // البحث في المنتجات
// export const searchProducts = createAsyncThunk(
//   "products/searchProducts",
//   async (searchQuery, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get(
//         `/products/search?q=${searchQuery}`,
//         {
//           withCredentials: true,
//         }
//       );
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

// // جلب الاقتراحات
// export const fetchSuggestions = createAsyncThunk(
//   "products/fetchSuggestions",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get("/products/suggestions", {
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

// const initialState = {
//   products: [],
//   currentProduct: null, // تم تغيير الاسم من selectedProduct إلى currentProduct
//   searchResults: [],
//   isLoading: false,
//   error: null,
//   message: null,
//   pagination: {
//     total: 0,
//     currentPage: 1,
//     totalPages: 1,
//   },
//   filters: {
//     search: "",
//     minPrice: "",
//     maxPrice: "",
//     brand: "",
//     category: "",
//     inStock: "",
//     sort: "newest",
//   },
// };

// const productsSlice = createSlice({
//   name: "products",
//   initialState,
//   reducers: {
//     clearState(state) {
//       state.error = null;
//       state.isLoading = false;
//       state.message = null;
//       state.currentProduct = null; // إضافة مسح currentProduct
//     },
//     clearCurrentProduct(state) {
//       state.currentProduct = null;
//     },
//     setFilters(state, action) {
//       state.filters = { ...state.filters, ...action.payload };
//     },
//     clearFilters(state) {
//       state.filters = initialState.filters;
//     },
//     clearSearchResults(state) {
//       state.searchResults = [];
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // fetchProducts
//       .addCase(fetchProducts.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.products = action.payload.products || [];
//         state.pagination = {
//           total: action.payload.total || 0,
//           currentPage: action.payload.currentPage || 1,
//           totalPages: action.payload.totalPages || 1,
//         };
//         state.error = null;
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || "خطأ في جلب المنتجات";
//       })
//       // fetchSingleProduct
//       .addCase(fetchSingleProduct.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchSingleProduct.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.currentProduct = action.payload;
//         state.error = null;
//       })
//       .addCase(fetchSingleProduct.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || "خطأ في جلب المنتج";
//       })
//       // createProduct
//       .addCase(createProduct.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//         state.message = null;
//       })
//       .addCase(createProduct.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.products.unshift(action.payload);
//         state.message = "تم إنشاء المنتج بنجاح";
//         state.error = null;
//       })
//       .addCase(createProduct.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || "خطأ في إنشاء المنتج";
//       })
//       // updateProduct
//       .addCase(updateProduct.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//         state.message = null;
//       })
//       .addCase(updateProduct.fulfilled, (state, action) => {
//         state.isLoading = false;
//         const index = state.products.findIndex(
//           (p) => p._id === action.payload._id
//         );
//         if (index !== -1) {
//           state.products[index] = action.payload;
//         }
//         state.currentProduct = action.payload;
//         state.message = "تم تحديث المنتج بنجاح";
//         state.error = null;
//       })
//       .addCase(updateProduct.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || "خطأ في تحديث المنتج";
//       })
//       // deleteProduct
//       .addCase(deleteProduct.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(deleteProduct.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.products = state.products.filter(
//           (p) => p._id !== action.payload.productId
//         );
//         state.message = action.payload.message || "تم حذف المنتج بنجاح";
//         state.error = null;
//       })
//       .addCase(deleteProduct.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || "خطأ في حذف المنتج";
//       })
//       // searchProducts
//       .addCase(searchProducts.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(searchProducts.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.searchResults = action.payload.products || [];
//         state.error = null;
//       })
//       .addCase(searchProducts.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || "خطأ في البحث";
//       })
//       // fetchSuggestions
//       .addCase(fetchSuggestions.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchSuggestions.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.suggestions = action.payload || [];
//         state.error = null;
//       })
//       .addCase(fetchSuggestions.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || "خطأ في جلب الاقتراحات";
//       });
//   },
// });

// export const {
//   clearState,
//   clearCurrentProduct,
//   setFilters,
//   clearFilters,
//   clearSearchResults,
// } = productsSlice.actions;
// export default productsSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../interceptor/axiosInstance";

// جلب كل المنتجات
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
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
        `/products?${queryParams.toString()}`,
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

// جلب منتج واحد
export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingleProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/products/${productId}`, {
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

// إنشاء منتج جديد
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      // إضافة البيانات النصية
      Object.keys(productData).forEach((key) => {
        if (key === "notes") {
          // تحويل كائن الملاحظات إلى JSON string
          formData.append("notes", JSON.stringify(productData[key]));
        } else if (key !== "images" && productData[key] !== undefined) {
          formData.append(key, productData[key]);
        }
      });
      // إضافة الصور
      if (productData.images && productData.images.length > 0) {
        productData.images.forEach((image) => {
          formData.append("images", image);
        });
      }
      const response = await axiosInstance.post("/products", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
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

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ productId, productData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      const existingImages = [];
      const newImages = [];

      if (productData.images && productData.images.length > 0) {
        productData.images.forEach((image) => {
          if (image instanceof File) {
            newImages.push(image);
          } else {
            existingImages.push(image);
          }
        });
      }

      Object.keys(productData).forEach((key) => {
        if (key === "images") return;
        if (key === "notes") {
          formData.append("notes", JSON.stringify(productData[key]));
        } else if (productData[key] !== undefined) {
          formData.append(key, productData[key]);
        }
      });

      newImages.forEach((image) => {
        formData.append("images", image);
      });

      if (existingImages.length > 0) {
        const cleanedExistingImages = existingImages
          .map((img) => (typeof img === "string" ? img.trim() : img))
          .filter((img) => img !== "");
        formData.append(
          "existingImages",
          JSON.stringify(cleanedExistingImages)
        );
      }

      const response = await axiosInstance.put(
        `/products/${productId}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
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

// حذف منتج
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/products/${productId}`, {
        withCredentials: true,
      });
      return { productId, message: response.data.message };
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

// البحث في المنتجات
export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/products/search?q=${searchQuery}`,
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

// جلب الاقتراحات
export const fetchSuggestions = createAsyncThunk(
  "products/fetchSuggestions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/products/suggestions", {
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
  products: [],
  currentProduct: null, // تم تغيير الاسم من selectedProduct إلى currentProduct
  searchResults: [],
  isLoading: false,
  error: null,
  message: null,
  pagination: {
    total: 0,
    currentPage: 1,
    totalPages: 1,
  },
  filters: {
    search: "",
    minPrice: "",
    maxPrice: "",
    brand: "",
    category: "",
    inStock: "",
    sort: "newest",
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearState(state) {
      state.error = null;
      state.isLoading = false;
      state.message = null;
      state.currentProduct = null; // إضافة مسح currentProduct
    },
    clearCurrentProduct(state) {
      state.currentProduct = null;
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
  },
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products || [];
        state.pagination = {
          total: action.payload.total || 0,
          currentPage: action.payload.currentPage || 1,
          totalPages: action.payload.totalPages || 1,
        };
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "خطأ في جلب المنتجات";
      })
      // fetchSingleProduct
      .addCase(fetchSingleProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentProduct = action.payload;
        state.error = null;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "خطأ في جلب المنتج";
      })
      // createProduct
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.unshift(action.payload);
        state.message = "تم إنشاء المنتج بنجاح";
        state.error = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "خطأ في إنشاء المنتج";
      })
      // updateProduct
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.products.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.currentProduct = action.payload;
        state.message = "تم تحديث المنتج بنجاح";
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "خطأ في تحديث المنتج";
      })
      // deleteProduct
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = state.products.filter(
          (p) => p._id !== action.payload.productId
        );
        state.message = action.payload.message || "تم حذف المنتج بنجاح";
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "خطأ في حذف المنتج";
      })
      // searchProducts
      .addCase(searchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload.products || [];
        state.error = null;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "خطأ في البحث";
      })
      // fetchSuggestions
      .addCase(fetchSuggestions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.suggestions = action.payload || [];
        state.error = null;
      })
      .addCase(fetchSuggestions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "خطأ في جلب الاقتراحات";
      });
  },
});

export const {
  clearState,
  clearCurrentProduct,
  setFilters,
  clearFilters,
  clearSearchResults,
} = productsSlice.actions;
export default productsSlice.reducer;
