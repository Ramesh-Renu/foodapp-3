import { createSlice} from '@reduxjs/toolkit';
import { categories } from '../action/CategoryAction';


const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        category: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(categories.pending, (state) => {
                state.loading = true;
            })
            .addCase(categories.fulfilled, (state, action) => {
                state.loading = false;
                state.category = action.payload;
                state.error = null;
            })
            .addCase(categories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default categoriesSlice.reducer;
