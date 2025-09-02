import { createSlice } from "@reduxjs/toolkit";
import { fetchGstSlabs } from "../action/GstSlabAction";


const initialState = {
  gstSlabs: [], 
  loading: false,
  error: null,
};

const gstSlabSlice = createSlice({
  name: "gstSlab",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGstSlabs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGstSlabs.fulfilled, (state, action) => {
        state.loading = false;
        state.gstSlabs = action.payload;
      })
      .addCase(fetchGstSlabs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default gstSlabSlice.reducer;
