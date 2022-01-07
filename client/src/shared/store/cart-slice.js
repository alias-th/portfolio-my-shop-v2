import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], totalQuantity: 0, changed: false, totalAmount: 0 },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.totalAmount = action.payload.totalAmount;
      state.items = action.payload.items;
    },

    fetchItemToCart(state, action) {
      const currentItem = action.payload;
      state.items = currentItem.items;
      state.totalQuantity = currentItem.totalQuantity;
      state.totalAmount = currentItem.totalAmount;
    },

    addItemToCart(state, action) {
      const newItem = action.payload;
      console.log(newItem.productId);
      const existingItem = state.items.find(
        (item) => item.productId === newItem.productId
      );

      state.totalQuantity++;
      state.totalAmount = state.totalAmount + newItem.price;
      state.changed = true;

      if (!existingItem) {
        state.items.push({
          productId: newItem.productId,
          name: newItem.name,
          price: newItem.price,
          color: newItem.color,
          size: newItem.size,
          imageCover: newItem.imageCover,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },

    removeFormCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.productId === id);

      state.totalQuantity--;
      state.totalAmount = state.totalAmount - existingItem.price;
      state.changed = true;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.productId !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const cartSliceActions = cartSlice.actions;

export default cartSlice;
