import { createAsyncThunk } from "@reduxjs/toolkit";
import Client from "../../ApolloClient"; // Ensure you are importing Apollo Client correctly
import { GET_RESTAURANTS } from "../query/RestaurantSearchQuery";

// Create async action to fetch restaurants
export const restaurantSearch = createAsyncThunk(
  'restaurants/fetchRestaurants',
  async ({ searchText }) => {
    try {
    
      const response = await Client.query({
        query: GET_RESTAURANTS,
        variables: { searchText: searchText || "" },
      });
      return response.data.restaurants;
    } catch (error) {
      throw new Error("Failed to fetch restaurants: " + error.message); 
    }
  }
);