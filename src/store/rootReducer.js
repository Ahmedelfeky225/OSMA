import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/auth";
import statsReducer from "./dashboard/stats";
import productsReducer from "./dashboard/products";
import categoriesReducer from "./dashboard/categories";
import reviewsReducer from "./reviews/reviews";

const rootReducer = combineReducers({
  auth: authReducer,
  stats: statsReducer,
  products: productsReducer,
  categories: categoriesReducer,
  reviews: reviewsReducer,
});

export default rootReducer;
