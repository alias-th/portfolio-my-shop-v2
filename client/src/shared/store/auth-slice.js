import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, isLoggedIn: false },
  reducers: {
    isLoggedIn(state, action) {
      state.user = {
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        photo: action.payload.photo,
        active: action.payload.active,
      };
    },
  },
});

export const authSliceActions = authSlice.actions;

export default authSlice;
