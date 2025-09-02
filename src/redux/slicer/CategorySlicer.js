// C:\CrestClimbers\Projects\foodapp\src\Redux\Slice\categorySlice.js
import { createSlice} from '@reduxjs/toolkit';
import { getCategories } from '../action/CategoryAction';

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
                state.error = null;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default categorySlice.reducer;
