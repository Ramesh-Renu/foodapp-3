import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CREATE_MENU,
  GET_HOMEPAGE_CATEGORIES,
  GET_MENUS,
  GET_RESTAURANT_BRANCHES,
  REMOVE_MENU,
  UPDATE_MENU
} from "../../query/RestaurantAdmin/RestaurantAdminMenuQuery";
import Client from "../../../ApolloClient";


export const fetchMenus = createAsyncThunk(
  "menus/fetchMenus",
  async (restaurantId) => {
    const response = await Client.query({
      query: GET_MENUS,
      variables: { restaurantId },
    });
    return response.data.menus;
  }
);

export const createMenu = createAsyncThunk(
  "menus/createMenu",
  async (menuData) => {
    const response = await Client.mutate({
      mutation: CREATE_MENU,
      variables: menuData,
    });
    return response.data.createMenu.data;
  }
);

export const updateMenu = createAsyncThunk(
  "menus/updateMenu",
  async (menuData) => {
    const response = await Client.mutate({
      mutation: UPDATE_MENU,
      variables: menuData,
    });
    return response.data.updateMenu.data;
  }
);

export const removeMenu = createAsyncThunk(
  "menus/removeMenu",
  async (menuId) => {
    const response = await Client.mutate({
      mutation: REMOVE_MENU,
      variables: { menuId },
    });
    return response.data.removeMenu.data;
  }
);

export const getCategory = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await Client.query({
      query: GET_HOMEPAGE_CATEGORIES,
    });
    return response.data.categoryBy;
  }
);

export const getRestaurantBranches = createAsyncThunk(
  "restaurants/getRestaurantBranches",
  async (restaurantId) => {
    const response = await Client.query({
      query: GET_RESTAURANT_BRANCHES,
      variables: { restaurantId },
    });
    return response.data.restaurants[0].branches;
  }
);
