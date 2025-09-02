// src/Redux/slicer/restaurantSlicer.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchNearbyRestaurants, fetchRestaurants } from '../action/HomePageRestaurantAction';

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState: {
    restaurants: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNearbyRestaurants.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNearbyRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload;
      })
      .addCase(fetchNearbyRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default restaurantSlice.reducer;
