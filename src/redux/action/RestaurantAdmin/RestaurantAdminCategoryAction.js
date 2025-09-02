import { createAsyncThunk } from "@reduxjs/toolkit";
import Client from "../../../ApolloClient";
import {
  CREATE_CATEGORY_MUTATION,
  DELETE_CATEGORY_MUTATION,
  GET_HOMEPAGE_CATEGORIES,
  UPDATE_CATEGORY_MUTATION
} from "../../query/RestaurantAdmin/RestaurantAdminCategoryQuery";

// Fetch categories
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Client.query({ query: GET_HOMEPAGE_CATEGORIES });
      return response.data.categoryBy;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create a category
export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async ({ categoryName }, { rejectWithValue }) => {
    try {
      const response = await Client.mutate({
        mutation: CREATE_CATEGORY_MUTATION,
        variables: { categoryName },
      });
      if (response.data.createCategory.success) {
        return response.data.createCategory.data;
      }
      return rejectWithValue(response.data.createCategory.message);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update a category
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ categoryId, categoryName }, { rejectWithValue }) => {
    try {
      const response = await Client.mutate({
        mutation: UPDATE_CATEGORY_MUTATION,
        variables: { categoryId, categoryName },
      });
      if (response.data.updateCategory.success) {
        return response.data.updateCategory.data;
      }
      return rejectWithValue(response.data.updateCategory.message);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete a category
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await Client.mutate({
        mutation: DELETE_CATEGORY_MUTATION,
        variables: { categoryId },
      });
      if (response.data.deleteCategory.success) {
        return categoryId;
      }
      return rejectWithValue(response.data.deleteCategory.message);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
