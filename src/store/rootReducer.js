import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/auth";
import statsReducer from "./dashboard/stats";
// import productsReducer from "./dashboard/products";
// import categoriesReducer from "./dashboard/categories";
import reviewsReducer from "./reviews/reviews";
import productsReducer from "./products/products";
import categoriesReducer from "./categories/categories";
import usersReducer from "./users/users";
const rootReducer = combineReducers({
  auth: authReducer,
  stats: statsReducer,
  reviews: reviewsReducer,
  products: productsReducer,
  categories: categoriesReducer,
  users: usersReducer,
});

export default rootReducer;
