import { configureStore } from "@reduxjs/toolkit";
import productsSlice, { fetchApiData } from "./productsSlice";
import cartSlice from "./cartSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});
store.dispatch(fetchApiData());
