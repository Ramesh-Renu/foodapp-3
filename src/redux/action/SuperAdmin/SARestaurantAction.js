import { createAsyncThunk } from "@reduxjs/toolkit";
import { CREATE_SAR, GET_SAR, UPDATE_SAR } from "../../query/SuperAdmin/SARestaurantQuery";
import Client from "../../../ApolloClient";


export const restaurantSearch = createAsyncThunk(
  "restaurants/fetchRestaurants",
  async ({ searchText }) => {
    const response = await Client.query({
      query: GET_SAR,
      variables: { searchText: searchText || "" },
    });
    return response.data.restaurants;
  }
);


export const createRestaurant = createAsyncThunk(
  "restaurants/createRestaurant",
  async (restaurantData, { rejectWithValue }) => {
    try {
      const response = await Client.mutate({
        mutation: CREATE_SAR,
        variables: restaurantData,
      });
      return response.data.createRestaurantWithBranch;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to create restaurant");
    }
  }
);

export const updateRestaurant = createAsyncThunk(
  "restaurant/updateRestaurant",
  async (variables, { rejectWithValue }) => {
    try {
      const response = await Client.mutate({
        mutation: UPDATE_SAR,
        variables,
      });
      const { data } = response;
      if (data.updateRestaurant) {
        return data.updateRestaurant;
      } else {
        throw new Error("Failed to update restaurant.");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
