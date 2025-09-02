import { createAsyncThunk } from "@reduxjs/toolkit";
import Client from "../../../ApolloClient";
import { GET_ORDERS_BY_RESTAURANT_ID, UPDATE_ORDER_TRACK_STATUS } from "../../query/RestaurantAdmin/RestaurantAdminOrderQuery";

export const fetchOrdersByRestaurantId = createAsyncThunk(
    'orders/fetchOrdersByRestaurantId',
    async (restaurantId, { rejectWithValue }) => {
      try {
        const response = await Client.query({
          query: GET_ORDERS_BY_RESTAURANT_ID,
          variables: { restaurantid: restaurantId },
          fetchPolicy: 'network-only', 
        });
      
        return response.data.ordersByRestaurantId[0]?.orders || []; 
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  export const updateOrderTrackStatus = createAsyncThunk(
    'orders/updateOrderTrackStatus',
    async ({ orderId, status }, { rejectWithValue }) => {
      try {
        const response = await Client.mutate({
          mutation: UPDATE_ORDER_TRACK_STATUS,
          variables: { orderId, status },
        });
  
        return response.data.updateOrderTrackStatus;
      } catch (error) {
        return rejectWithValue(error.message);
     }
     }
  );