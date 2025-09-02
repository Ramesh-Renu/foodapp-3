import { createSlice } from "@reduxjs/toolkit";
import { fetchCuisineTypes, addCuisineType, deleteCuisineType, editCuisineType } from "../../action/RestaurantAdmin/RestaurantAdminCuisineAction";


const cuisineSlice = createSlice({
    name: 'cuisines',
    initialState: {
      cuisineTypes: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchCuisineTypes.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchCuisineTypes.fulfilled, (state, action) => {
          state.loading = false;
          state.cuisineTypes = action.payload;
        })
        .addCase(fetchCuisineTypes.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(addCuisineType.fulfilled, (state, action) => {
          state.cuisineTypes.push(action.payload);
        })
        .addCase(editCuisineType.fulfilled, (state, action) => {
          const index = state.cuisineTypes.findIndex(
            (cuisine) => cuisine.cuisineTypeId === action.payload.cuisineTypeId
          );
          if (index !== -1) {
            state.cuisineTypes[index] = action.payload;
          }
        })
        .addCase(deleteCuisineType.fulfilled, (state, action) => {
          state.cuisineTypes = state.cuisineTypes.filter(
            (cuisine) => cuisine.cuisineTypeId !== action.payload
          );
        });
    },
  });
  
  export default cuisineSlice.reducer;