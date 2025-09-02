import { createSlice } from '@reduxjs/toolkit';
import { restaurantUserLogin } from '../../action/RestaurantAdmin/RestaurantAdminLoginUserAction';

// Get values from localStorage to persist across page reloads
const initialState = {
  user: null,
  restaurantUserId: localStorage.getItem('restaurantUserId') || null,
  restaurantId: localStorage.getItem('restaurantId') || null,
  branchId: localStorage.getItem('branchId') || null,
  loading: false,
  error: null,
};

const restaurantUserSlice = createSlice({
  name: 'restaurantUser',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.restaurantUserId = null;
      state.restaurantId = null;
      state.branchId = null;
      state.loading = false;
      state.error = null;

      // Clear localStorage on logout
      localStorage.removeItem('restaurantUserId');
      localStorage.removeItem('restaurantId');
      localStorage.removeItem('branchId');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(restaurantUserLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(restaurantUserLogin.fulfilled, (state, action) => {
        console.log(action.payload.data.restaurantId);
        state.loading = false;
        state.user = action.payload.data;
        state.restaurantUserId = action.payload.data.restaurantUserId;
        state.restaurantId = action.payload.data.restaurantId;
        state.branchId = action.payload.data.branchId;

        // Store data in localStorage after successful login
        localStorage.setItem('restaurantUserId', action.payload.data.restaurantUserId);
        localStorage.setItem('restaurantId', action.payload.data.restaurantId);
        localStorage.setItem('branchId', action.payload.data.branchId);
      })
      .addCase(restaurantUserLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = restaurantUserSlice.actions;

export default restaurantUserSlice.reducer;
