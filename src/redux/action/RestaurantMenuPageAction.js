import { createAsyncThunk } from "@reduxjs/toolkit";
import Client from "../../ApolloClient";
import { GET_RESTAURANTSS } from "../query/RestaurantMenuPageQuery";

export const restaurantMenuPageAction = createAsyncThunk(
  "restaurants/fetchRestaurants",
  async ({ restaurantId }) => {
    const response = await Client.query({
      query: GET_RESTAURANTSS,
      variables: {
        restaurantId: parseInt(restaurantId, 10),
        searchText: "",
        categoryName: "",
      },
    });
    return response.data.restaurants;
  }
);
