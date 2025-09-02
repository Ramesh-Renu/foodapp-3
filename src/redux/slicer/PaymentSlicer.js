import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { completePaymentAction, handlePaymentAction } from '../action/PaymentAction';


const paymentSlice = createSlice({
  name: 'payment',
  initialState: { status: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handlePaymentAction.fulfilled, (state, action) => {
        state.status = action.payload.status;
      })
      .addCase(completePaymentAction.fulfilled, (state, action) => {
        state.status = action.payload.status;
      });
  },
});

export default paymentSlice.reducer;
