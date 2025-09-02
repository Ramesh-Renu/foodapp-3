// src/redux/action/SupercuisineAction.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import Client from '../../../ApolloClient';
import { ADD_CUISINE_TYPE, DELETE_CUISINE_TYPE, EDIT_CUISINE_TYPE, FETCH_CUISINE_TYPES } from '../../query/RestaurantAdmin/RestaurantAdmincuisineQuery';



// Async Thunk for fetching cuisine types
export const fetchCuisineTypes = createAsyncThunk(
  'cuisines/fetchCuisineTypes',
  async () => {
    const { data } = await Client.query({
      query: FETCH_CUISINE_TYPES,
    });
    return data.cousineTypes;
  }
);

// Async Thunk for adding a cuisine type
export const addCuisineType = createAsyncThunk(
  'cuisines/addCuisineType',
  async (newCuisine) => {
    const { data } = await Client.mutate({
      mutation: ADD_CUISINE_TYPE,
      variables: { name: newCuisine.name },
    });
    if (data.createCuisineType.success) {
      return data.createCuisineType.data;
    }
    throw new Error(data.createCuisineType.message);
  }
);

// Async Thunk for editing a cuisine type
export const editCuisineType = createAsyncThunk(
  'cuisines/editCuisineType',
  async ({ cuisineTypeId, updatedCuisine }) => {
    const { data } = await Client.mutate({
      mutation: EDIT_CUISINE_TYPE,
      variables: { cuisineTypeId, name: updatedCuisine.name },
    });
    if (data.updateCuisineType.success) {
      return data.updateCuisineType.data;
    }
    throw new Error(data.updateCuisineType.message);
  }
);

// Async Thunk for deleting a cuisine type
export const deleteCuisineType = createAsyncThunk(
  'cuisines/deleteCuisineType',
  async (cuisineTypeId) => {
    const { data } = await Client.mutate({
      mutation: DELETE_CUISINE_TYPE,
      variables: { cuisineTypeId },
    });
    if (data.deleteCuisineType.success) {
      return cuisineTypeId;
    }
    throw new Error(data.deleteCuisineType.message);
  }
);
