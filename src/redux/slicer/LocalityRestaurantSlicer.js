import { createSlice } from '@reduxjs/toolkit';
import { fetchRestaurantsByLocality } from '../action/LocalityRestaurantAction';

const initialState = {
  restaurants: [],
  status: 'idle',
  error: null,
};

const localityRestaurantSlice = createSlice({
  name: 'localityRestaurants',
  initialState,
  reducers: {
    clearRestaurants: (state) => {
      state.restaurants = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurantsByLocality.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchRestaurantsByLocality.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.restaurants = action.payload;
        state.error = null;
      })
      .addCase(fetchRestaurantsByLocality.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearRestaurants } = localityRestaurantSlice.actions;
export default localityRestaurantSlice.reducer;