import { createSlice } from "@reduxjs/toolkit";
import { restaurantSearch } from "../action/RestaurantSearchAction";

const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState: {
    restaurant: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(restaurantSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(restaurantSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurant = action.payload;
      })
      .addCase(restaurantSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default restaurantSlice.reducer;
