// D:\food_app_dev\FoodApp Sprint\src\redux\action\UpdateCartAction.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import Client from '../../ApolloClient';
import { UPDATE_CART_MUTATION } from '../query/UpdateCartQuery';

export const UpdateCart = createAsyncThunk(
  'cart/updateCart',
  async ({ cartId, items, discountCode, finalAmount }, { rejectWithValue }) => {
    const variables = {
      input: {
        cartId,
        items,
        discountCode,
        finalAmount,
      },
    };

    try {
      const response = await Client.mutate({
        mutation: UPDATE_CART_MUTATION,
        variables,
      });
      return response.updateCartNew.data;  // Adjust based on response structure
    } catch (error) {
      console.error("Update Cart Error:", error);
      return rejectWithValue(error.message);
    }
  }
);
