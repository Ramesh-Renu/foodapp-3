import { createSlice } from '@reduxjs/toolkit';
import { fetchOrdersByRestaurantId, updateOrderTrackStatus } from '../../action/RestaurantAdmin/RestaurantAdminOrderAction';

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],  // Initialize orders as an empty array
    status: 'idle', 
    error: null,
    updateStatus: {
      loading: false,
      success: false,
      message: '',
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersByRestaurantId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrdersByRestaurantId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchOrdersByRestaurantId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateOrderTrackStatus.pending, (state) => {
        state.updateStatus.loading = true;
        state.updateStatus.error = null;
      })
      .addCase(updateOrderTrackStatus.fulfilled, (state, action) => {
        state.updateStatus.loading = false;
        state.updateStatus.success = true;
        state.updateStatus.message = action.payload.message;

        // Update the order status directly in the orders array
        const updatedOrder = action.payload.data;
        const orderIndex = state.orders.findIndex(order => order.orderId === updatedOrder.orderId);
        if (orderIndex !== -1) {
          state.orders[orderIndex] = updatedOrder;
        }
      })
      .addCase(updateOrderTrackStatus.rejected, (state, action) => {
        state.updateStatus.loading = false;
        state.updateStatus.success = false;
        state.updateStatus.message = action.payload || 'Failed to update order status';
      });
  },
});

export default ordersSlice.reducer;
