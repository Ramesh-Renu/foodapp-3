// src/redux/slices/cartSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCartAction,
  updateCartAction,
  deleteCartAPIAction,
  fetchCartByUserIdAction,
} from "../action/CartAction";

const initialCart = {
  cartId: null,
  createdAt: Date.now(),
  discountAmount: 0,
  finalAmount: 0,
  gstAmount: 0,
  itemTotal: 0,
  packagingCharges: 0,
  restaurantId: null,
  restaurantName: null,
  serviceCharge: 0,
  status: "",
  updatedAt: Date.now(),
  userId: null,
  cartItems: [],
};

// Slice definition
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: initialCart,
    loading: false,
    message: "",
    status: "",
    error: null,
  },
  reducers: {
    resetMessages: (state) => {
      state.cart.message = "";
      state.cart.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartByUserIdAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartByUserIdAction.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(fetchCartByUserIdAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
    // .addCase(createCartAction.pending, (state) => {
    //   state.loading = true;
    // })
    // .addCase(createCartAction.fulfilled, (state, action) => {
    //   // state.cart = action.payload.cart;
    //   state.loading = false;
    //   state.error = null;
    // })
    // .addCase(createCartAction.rejected, (state, action) => {
    //   state.error = action.error.message;
    // })
    // .addCase(updateCartAction.pending, (state) => {
    //   state.loading = true;
    // })
    // .addCase(updateCartAction.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.error = null;
    // })
    // .addCase(updateCartAction.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message;
    // })
    .addCase(deleteCartAPIAction.pending, (state) => {
      state.loading = true;
    })
    .addCase(deleteCartAPIAction.fulfilled, (state, action) => {
      state.cart = initialCart;
      state.loading = false;
      state.error = null;
    })
    .addCase(deleteCartAPIAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export const { resetMessages } = cartSlice.actions;
//export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
