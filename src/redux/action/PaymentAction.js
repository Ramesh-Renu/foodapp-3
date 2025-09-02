import { createAsyncThunk } from "@reduxjs/toolkit";

import Client from "../../ApolloClient";
import { COMPLETE_PAYMENT_MUTATION, HANDLE_PAYMENT_MUTATION } from "../query/PaymentQuery";

export const handlePaymentAction = createAsyncThunk(
  'payment/handlePayment',
  async (paymentInput, { rejectWithValue }) => {
    try {
      const { data } = await Client.mutate({
        mutation: HANDLE_PAYMENT_MUTATION,
        variables: { input: paymentInput },
      });
      return data.handlePayment;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const completePaymentAction = createAsyncThunk(
  'payment/completePayment',
  async (paymentInput, { rejectWithValue }) => {
    try {
      const { data } = await Client.mutate({
        mutation: COMPLETE_PAYMENT_MUTATION,
        variables: { input: paymentInput },
      });
      return data.completePayment;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
