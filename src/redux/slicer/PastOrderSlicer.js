import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Client from '../../ApolloClient';
import { GET_PAST_ORDERS } from '../query/PastOrderQuery';

export const fetchPastOrders = createAsyncThunk(
  'pastOrders/fetchPastOrders',
  async (userId, { rejectWithValue }) => {
    try {
      if (!userId || isNaN(userId)) {
        throw new Error('Invalid user ID');
      }

      const { data } = await Client.query({
        query: GET_PAST_ORDERS,
        variables: { 
          id: userId,  // Pass userId as an integer
          orderStatus: "" 
        },
        fetchPolicy: 'no-cache',
      });

      return data.userDetails.orders;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch past orders');
    }
  }
);

const pastOrdersSlice = createSlice({
  name: 'pastOrders',
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPastOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPastOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchPastOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default pastOrdersSlice.reducer;
