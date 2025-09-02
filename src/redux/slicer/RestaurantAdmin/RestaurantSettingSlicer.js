import { createSlice } from "@reduxjs/toolkit";
import { fetchRestaurantDetails, updateRestaurantAndBranch } from "../../action/RestaurantAdmin/RestaurantSettingAction";

const initialState = {
  restaurant: null,
  loading: false,
  error: null,
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    resetRestaurantState: (state) => {
      state.restaurant = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchRestaurantDetails cases
    builder
      .addCase(fetchRestaurantDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurantDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurant = action.payload;
      })
      .addCase(fetchRestaurantDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle updateRestaurantAndBranch cases
    builder
      .addCase(updateRestaurantAndBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRestaurantAndBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurant = action.payload;  // Update the restaurant data with new details
      })
      .addCase(updateRestaurantAndBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetRestaurantState } = restaurantSlice.actions;
export default restaurantSlice.reducer;
