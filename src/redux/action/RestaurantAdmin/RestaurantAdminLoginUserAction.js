//import { LOGIN_RESTAURANT_USER } from '../../query/RestaurantAdmin/RestaurantUserQuery';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Client from '../../../ApolloClient';
import { LOGIN_RESTAURANT_USER } from '../../query/RestaurantAdmin/RestaurantUserQuery';

export const restaurantUserLogin = createAsyncThunk(
  'restaurantsLogin/fetchRestaurantsLogin',
  async ({ username, password }) => {
    const data = { username, password };
    const response = await Client.mutate({
      mutation: LOGIN_RESTAURANT_USER,
      variables: data,
    });
    return response.data.loginRestaurantUser;
  }
);



