import { createAsyncThunk } from '@reduxjs/toolkit';
import { GET_HOMEPAGE_RESTAURANTS } from '../query/HomePageRestaurantQuery';
import Client from '../../ApolloClient';

export const fetchNearbyRestaurants = createAsyncThunk(
  'restaurants/fetchNearbyRestaurants',
  async ({ latitude, longitude, radiusKm }, { rejectWithValue }) => {
    try {
      // Ensure these are parsed as floats (if they are coming in as strings)
      const lat = parseFloat(latitude); 
      const lon = parseFloat(longitude);
      const radius = parseFloat(radiusKm);

      const { data } = await Client.query({
        query: GET_HOMEPAGE_RESTAURANTS,
        variables: { latitude: lat, longitude: lon, radiusKm: radius },
      });
      return data.nearbyBranchesWithRestaurantDetails;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
