// C:\ccs\Project\FoodApp Sprint\src\redux\slicer\HomePageTopOrderMenuSlicer.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchTopOrderedMenus } from '../action/HomePageTopOrderMenuActions';

// Create the slice for handling top ordered menus
const homePageTopOrderMenuSlice = createSlice({
  name: 'menu',
  initialState: {
    topMenus: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopOrderedMenus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTopOrderedMenus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.topMenus = action.payload;
      })
      .addCase(fetchTopOrderedMenus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default homePageTopOrderMenuSlice.reducer;
