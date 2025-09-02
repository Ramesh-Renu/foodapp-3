import { createAsyncThunk } from "@reduxjs/toolkit";
import Client from "../../ApolloClient";
import { GET_ORDERS_STATUS } from "../query/OrderTrackingQuery";

export const fetchOrdersTracking = createAsyncThunk(
  "orders/fetchOrdersStatus",
  async ({ userId }, { rejectWithValue }) => {
    try {
      // console.log("Query Variables:", { userId });
      const { data } = await Client.query({
        query: GET_ORDERS_STATUS,
        variables: { userId },
      });
      // Ensure we extract the correct data structure
      if (Array.isArray(data?.ordersStatusByUserId) && data.ordersStatusByUserId.length > 0) {
        return data.ordersStatusByUserId[0]?.orders || [];
      } else {
        return []; // Return an empty array if no valid data is found
      }
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.message);
    }
    
  }
);
