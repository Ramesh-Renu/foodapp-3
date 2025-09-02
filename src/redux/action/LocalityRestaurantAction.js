import { createAsyncThunk } from '@reduxjs/toolkit';
import { GET_RESTAURANTS_BY_LOCALITY } from '../query/LocalityRestaurantQuery';
import Client from '../../ApolloClient';

export const fetchRestaurantsByLocality = createAsyncThunk(
  'restaurants/fetchByLocality',
  async ({ locality }, { rejectWithValue }) => {
    try {
      const { data } = await Client.query({
        query: GET_RESTAURANTS_BY_LOCALITY,
        variables: { locality },
      });
      
      return data.restaurants;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);