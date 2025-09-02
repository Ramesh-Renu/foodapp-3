import { createAsyncThunk } from '@reduxjs/toolkit';
import Client from '../../ApolloClient';
import { GET_CART_QUERY } from '../query/GetCartQuery';


export const fetchCartByUserId = createAsyncThunk(
  'cart/fetchCartByUserId',
  async (userId, { rejectWithValue }) => {

    const variables = {
      userId,
    };

    try {
      const response = await Client(GET_CART_QUERY, variables);
      return response.cartByUserId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);