import { createAsyncThunk } from "@reduxjs/toolkit";
import Client from "../../ApolloClient"; // Make sure this path is correct
import { GET_RESTAURANTS } from "../query/restaurantSearchQuery"; // Make sure this path is correct

export const fetchLocalities = createAsyncThunk('restaurants/fetchLocalities', async (searchText) => {
  const { data } = await Client.query({
    query: GET_RESTAURANTS,
    variables: { searchText },
  });
  return data.restaurants.branches;
});
