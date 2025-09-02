import { createAsyncThunk } from '@reduxjs/toolkit';
import Client from '../../ApolloClient';
import { GET_RESTAURANTS_BY_LOCALITY } from '../query/LocalityRestaurantQuery';

export const fetchRestaurantsByLocality = createAsyncThunk(
  'localityrestaurants/fetchByLocality',  
  async ({ locality }) => {
    try {
      const response = await Client.query({
        query: GET_RESTAURANTS_BY_LOCALITY,
        variables: { locality }, // Make sure locality is passed as a string here
      });
      return response.data.restaurants;
    } catch (error) {
      console.error("Error fetching restaurants by locality:", error);
      throw error;
    }
  }
);