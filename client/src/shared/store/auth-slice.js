import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null },
  reducers: {
    isLoggedIn(state, action) {
      state.user = {
        name: action.payload.name,
        email: action.payload.email,
        photo: action.payload.photo,
      };
    },
  },
});

export const authSliceActions = authSlice.actions;

export default authSlice;
