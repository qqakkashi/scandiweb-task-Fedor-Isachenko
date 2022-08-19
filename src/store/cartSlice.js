import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    currency: "$",
    products: [],
  },
  reducers: {
    setCurrency(state, action) {
      state.currency = action.payload;
    },
    addProductToCart(state, action) {
      state.products = action.payload;
    },
  },
});

export const { setCurrency, addProductToCart } = cartSlice.actions;
