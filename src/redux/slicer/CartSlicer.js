//D:\food_app_dev\FoodApp Sprint\src\redux\slicer\CreateCartSlicer.js

import { createSlice } from '@reduxjs/toolkit';
import { fetchCartByUserId } from '../action/GetCartAction';
import { CreateCart } from '../action/CreateCartAction';
import { UpdateCart } from '../action/UpdateCartAction';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CreateCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(CreateCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.data.cart;
        state.error = null;
      })
      .addCase(CreateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCartByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload; 
        state.error = null;
      })
      .addCase(fetchCartByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(UpdateCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(UpdateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

//export const selectCart = (state) => state.cart.cart;

export default cartSlice.reducer;
