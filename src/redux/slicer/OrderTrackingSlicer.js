import { createSlice } from "@reduxjs/toolkit";
import { fetchOrdersTracking } from "../action/OrderTrackingAction";


// Initial state for orders
const initialState = {
  orders: [],
  //orderId: null,
  loading: false,
  error: null,
};

// Create the orders slice
const ordertrackingSlice = createSlice({
  name: "orderstatus",
  initialState,
  reducers: {
    // setOrderId: (state, action) => {
    //   state.orderId = action.payload;
    // },
   },
  extraReducers: (builder) => {
    builder
    .addCase(fetchOrdersTracking.pending, (state) => {
      // console.log("Loading orders...");
      state.loading = true;
    })
    .addCase(fetchOrdersTracking.fulfilled, (state, action) => {
      // console.log("Reducer Fulfilled Payload:", action.payload);
      state.orders = action.payload || [];
      state.loading = false;
    })
    .addCase(fetchOrdersTracking.rejected, (state, action) => {
      // console.error("Error loading orders:", action.payload);
      state.error = action.payload;
      state.loading = false;
    });
  },
});

//export const { setOrderId } = ordertrackingSlice.actions;
// Export the reducer
export default ordertrackingSlice.reducer;
