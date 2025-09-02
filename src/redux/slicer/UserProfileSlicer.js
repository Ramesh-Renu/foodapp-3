import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  loading: false,
  error: null,
  success: false,
  message: '',
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
      state.error = null;
    },
    profileSuccess(state, action) {
      state.loading = false;
      state.success = true;
      state.data = action.payload.data;
      state.message = action.payload.message;
    },
    profileFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { startLoading, profileSuccess, profileFailure } = userProfileSlice.actions;
export default userProfileSlice.reducer;
