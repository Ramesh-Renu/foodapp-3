import { createAsyncThunk } from "@reduxjs/toolkit";
import Client from "../../ApolloClient";
import { CREATE_ORDER_MUTATION } from "../query/OrderQuery";

export const createOrderAction = createAsyncThunk(
  'order/createOrder',
  async (orderInput, { rejectWithValue }) => {
    try {
      const { data } = await Client.mutate({
        mutation: CREATE_ORDER_MUTATION,
        variables: { input: orderInput },
      });
      if (data.createOrder.success) {
        return data.createOrder.data.order; // Ensure `data.order` contains `orderId`
      } else {
        throw new Error(data.createOrder.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
