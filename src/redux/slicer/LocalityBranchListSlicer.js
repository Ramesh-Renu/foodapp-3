// C:\ccs\Project\FoodApp Sprint\src\redux\slicer\LocalityBranchListSlicer.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchRestaurantsByLocality } from '../action/LocalityBranchListAction';


// Slice configuration
const localityrestaurantsSlice = createSlice({
  name: 'localityrestaurants',
  initialState: { restaurants: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurantsByLocality.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRestaurantsByLocality.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.restaurants = action.payload;
      })
      .addCase(fetchRestaurantsByLocality.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default localityrestaurantsSlice.reducer;
