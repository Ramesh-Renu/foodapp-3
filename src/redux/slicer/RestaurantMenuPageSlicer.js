import { createSlice } from "@reduxjs/toolkit";
import { restaurantMenuPageAction } from "../action/RestaurantMenuPageAction";

const restaurantSlicer = createSlice({
  name: "restaurant",
  initialState: {
    restaurantMenus: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(restaurantMenuPageAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(restaurantMenuPageAction.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurantMenus = action.payload;
      })
      .addCase(restaurantMenuPageAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default restaurantSlicer.reducer;
