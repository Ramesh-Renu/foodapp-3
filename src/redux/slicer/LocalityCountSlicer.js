import { createSlice } from "@reduxjs/toolkit";
import { fetchLocalities } from "../action/LocalityCountAction";

export const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState: {
    branches: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocalities.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLocalities.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.branches = action.payload;
      })
      .addCase(fetchLocalities.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default restaurantsSlice.reducer;
