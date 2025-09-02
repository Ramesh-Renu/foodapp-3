import { createSlice } from "@reduxjs/toolkit";
import { fetchLocalities } from "../action/HomeBranchCountAction";

// Slice
const locationSlice = createSlice({
    name: "location",
    initialState: {
        localities: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLocalities.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLocalities.fulfilled, (state, action) => {
                state.loading = false;
                state.localities = action.payload;
            })
            .addCase(fetchLocalities.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default locationSlice.reducer;
