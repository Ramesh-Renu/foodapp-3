import { createSlice } from '@reduxjs/toolkit';

const updateUserProfileSlice = createSlice({
  name: 'profile',
  initialState: {
    loading: false,
    error: null,
    updateSuccess: false,
    userData: null
  },
  reducers: {
    updateProfileStart: (state) => {
      state.loading = true;
      state.error = null;
      state.updateSuccess = false;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false;
      state.updateSuccess = true;
      state.userData = action.payload;
    },
    updateProfileError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.updateSuccess = false;
    },
    resetProfileState: (state) => {
      state.loading = false;
      state.error = null;
      state.updateSuccess = false;
    }
  }
});

export const {
  updateProfileStart,
  updateProfileSuccess,
  updateProfileError,
  resetProfileState
} = updateUserProfileSlice.actions;

export default updateUserProfileSlice.reducer;