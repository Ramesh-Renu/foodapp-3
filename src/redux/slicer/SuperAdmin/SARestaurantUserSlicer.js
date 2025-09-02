import { createSlice } from "@reduxjs/toolkit";
import { fetchRestaurantUsers, createRestaurantUser, updateRestaurantUser, fetchRestaurants } from "../../action/SuperAdmin/SARestaurantUserAction";

const initialState = {
  users: [],
  restaurants: [],
  loading: false,
  error: null,
  successMessage: null,
};

const restaurantUserSlice = createSlice({
  name: "restaurantUsers",
  initialState,
  reducers: {
    clearMessages(state) {
      state.successMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Restaurant Users
    builder
      .addCase(fetchRestaurantUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurantUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchRestaurantUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Restaurants
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create Restaurant User
    builder
      .addCase(createRestaurantUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRestaurantUser.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        if (action.payload.success) {
          state.users.push(action.payload.data);
        }
      })
      .addCase(createRestaurantUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Restaurant User
    builder
      .addCase(updateRestaurantUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRestaurantUser.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        if (action.payload.success) {
          const updatedUser = action.payload.data;
          state.users = state.users.map((user) =>
            user.restaurantUserId === updatedUser.restaurantUserId ? updatedUser : user
          );
        }
      })
      .addCase(updateRestaurantUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = restaurantUserSlice.actions;

export default restaurantUserSlice.reducer;
