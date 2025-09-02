//D:\food_app_dev\FoodApp Sprint\src\redux\action\CreateCartAction.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import Client from '../../ApolloClient';
import { CREATE_CART_MUTATION } from '../query/CreateCartQuery';

 

export const CreateCart = createAsyncThunk(
  'cart/createCart',
  async ({ items, discountCode, parsedRestaurantId, userId }, { rejectWithValue }) => {
    
    const variables = {
      input: {
        items,
        discountCode,
        restaurantId: parsedRestaurantId,
        userId,
      },
    };

    try {
      const response = await Client.mutate({
        mutation: CREATE_CART_MUTATION,
        variables,
      });
      return response.createCart.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);

    }
  }
);
