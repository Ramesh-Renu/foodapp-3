import { createAsyncThunk } from "@reduxjs/toolkit";
import Client from "../../../ApolloClient";
import { GET_RESTAURANT_DETAILS, UPDATE_RESTAURANT_AND_BRANCH } from "../../query/RestaurantAdmin/RestaurantSettingQuery";

export const fetchRestaurantDetails = createAsyncThunk(
  "restaurant/fetchRestaurantDetails",
  async (restaurantId, { rejectWithValue }) => {
    try {
      const response = await Client.query({
        query: GET_RESTAURANT_DETAILS,
        variables: { restaurantId },
      });
      const restaurant = response.data.restaurants[0];
      if (!restaurant) {
        throw new Error("Restaurant not found");
      }
      return restaurant;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);



export const updateRestaurantAndBranch = createAsyncThunk(
  "restaurant/updateRestaurantAndBranch",
  async (
    {
      restaurantId,
      branchId,
      houseNumber,
      streetName,
      locality,
      city,
      state,
      postalCode,
      phoneNumber,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await Client.mutate({
        mutation: UPDATE_RESTAURANT_AND_BRANCH,
        variables: {
          restaurantId,
          branchId,
          houseNumber,
          streetName,
          locality,
          city,
          state,
          postalCode,
          phoneNumber,
        },
      });

      const result = response.data.updateRestaurantAndBranch;

      if (!result.success) {
        throw new Error(result.message || "Failed to update restaurant and branch details.");
      }

      return result.data; // Return updated data if success
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);
