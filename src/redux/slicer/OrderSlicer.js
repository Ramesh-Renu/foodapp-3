import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Client from '../../ApolloClient';
import CREATE_ORDER_MUTATION from '../../redux/query/OrderQuery'
import { createOrderAction } from '../action/OrderAction';


const orderSlice = createSlice({
  name: 'order',
  initialState: { order: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrderAction.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createOrderAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
