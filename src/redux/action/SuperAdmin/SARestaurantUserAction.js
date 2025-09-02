import { createAsyncThunk } from "@reduxjs/toolkit";
import Client from "../../../ApolloClient";
import { GET_RESTAURANT_USERS, CREATE_RESTAURANT_USER, UPDATE_RESTAURANT_USER, GET_SAR } from "../../query/SuperAdmin/SARestaurantUserQuery";

// Fetch Restaurant Users
export const fetchRestaurantUsers = createAsyncThunk(
  "restaurantUsers/fetchRestaurantUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Client.query({
        query: GET_RESTAURANT_USERS,
        fetchPolicy: "network-only",
      });
      return data.restaurantUsers;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create Restaurant User
export const createRestaurantUser = createAsyncThunk(
  "restaurantUsers/createRestaurantUser",
  async (input, { rejectWithValue }) => {
    try {
      const { data } = await Client.mutate({
        mutation: CREATE_RESTAURANT_USER,
        variables: input,
      });
      return data.createRestaurantUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update Restaurant User
export const updateRestaurantUser = createAsyncThunk(
  "restaurantUsers/updateRestaurantUser",
  async (input, { rejectWithValue }) => {
    try {
      const { data } = await Client.mutate({
        mutation: UPDATE_RESTAURANT_USER,
        variables: input,
      });
      return data.updateRestaurantUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const fetchRestaurants = createAsyncThunk(
    "restaurantUsers/fetchRestaurants",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await Client.query({
          query: GET_SAR,
          variables: { searchText: "" }, 
          fetchPolicy: "network-only",
        });
        return data.restaurants;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );