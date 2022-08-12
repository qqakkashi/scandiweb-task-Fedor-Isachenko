import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "currency",
  initialState: {
    currency: "$",
  },
  reducers: {
    setCurrency(state, action) {
      state.currency = action.payload;
    },
  },
});

export const { setCurrency } = cartSlice.actions;

export default cartSlice.reducer;
