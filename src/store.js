import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Feature/Auth/authSlice";
import orderSlice from './Feature/Order/orderSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    order: orderSlice
  },
});
