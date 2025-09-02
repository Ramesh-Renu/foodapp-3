// redux/slice/menuSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { createMenu, fetchMenus, getCategory, getRestaurantBranches, removeMenu, updateMenu } from "../../action/RestaurantAdmin/RestaurantAdminMenuAction";

const menuSlice = createSlice({
  name: "menus",
  initialState: {
    menus: [],
    categories: [],
    branches: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMenus.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMenus.fulfilled, (state, action) => {
        state.loading = false;
        state.menus = action.payload;
      })
      .addCase(fetchMenus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createMenu.fulfilled, (state, action) => {
        state.menus.push(action.payload);
      })
      .addCase(updateMenu.fulfilled, (state, action) => {
        const index = state.menus.findIndex(
          (menu) => menu && menu.menuId === action.payload.menuId
        );
        if (index !== -1) {
          state.menus[index] = action.payload;
        }
      })
      
      .addCase(removeMenu.fulfilled, (state, action) => {
        state.menus = state.menus.filter(
          (menu) => menu && menu.menuId !== action.payload.menuId
        );
      })
      .addCase(getRestaurantBranches.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRestaurantBranches.fulfilled, (state, action) => {
        state.loading = false;
        state.branches = action.payload;
      })
      .addCase(getRestaurantBranches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default menuSlice.reducer;
