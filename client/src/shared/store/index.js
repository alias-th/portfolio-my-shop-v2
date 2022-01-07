import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import uiSlice from "./ui-slice";
import cartSlice from "./cart-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
