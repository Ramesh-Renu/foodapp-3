import { createSlice } from "@reduxjs/toolkit";
import { restaurantSearch, createRestaurant, updateRestaurant } from "../../action/SuperAdmin/SARestaurantAction";

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState: {
    restaurantsar: [],
    loading: false,
    error: null,
    createSuccess: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Restaurants
      .addCase(restaurantSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(restaurantSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurantsar = action.payload;
      })
      .addCase(restaurantSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.createSuccess = null;
      })
      .addCase(createRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.createSuccess = action.payload;
      })
      .addCase(createRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }).addCase(updateRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      });
  },
});

export default restaurantSlice.reducer;
