import {
  DELETE_CART_MUTATION,
  CREATE_CART_MUTATION,
  UPDATE_CART_MUTATION,
  GET_CART_QUERY,
} from "../query/CartQuery";
import Client from "../../ApolloClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createCartAction = createAsyncThunk(
  "cart/create",
  async ({ items, userId, restaurantId }) => {
    const parsedRestaurantId = parseInt(restaurantId, 10);
    const input = {
      items,
      discountCode: null,
      restaurantId: parsedRestaurantId,
      userId,
    };

    const { data } = await Client.mutate({
      mutation: CREATE_CART_MUTATION,
      variables: { input },
    });

    return {
      cart: data.createCart.data.cart,
      message: data.createCart.message,
      success: data.createCart.success,
    };
  }
);
// Update Cart
export const updateCartAction = createAsyncThunk(
  "cart/update",
  async ({ cartId, items }) => {
    // Filter items to only include fields valid for UpdateCartItemInput
    const filteredItems = items.map((item) => ({
      cartItemId: item.cartItemId,
      menuItemId: item.menuItemId,
      quantity: item.quantity,
    }));

    const { data } = await Client.mutate({
      mutation: UPDATE_CART_MUTATION,
      variables: { input: { cartId, items: filteredItems } },
    });

    return data.updateCartNew.data.cart;
  }
);

export const deleteCartAPIAction = createAsyncThunk(
  " cart/delete",
  async ({ cartId }) => {
    const input = {
      cartId,
    };

    const { data } = await Client.mutate({
      mutation: DELETE_CART_MUTATION,
      variables: { input },
    });
    return data.deleteCart;
  }
);

// Fetch Cart by User ID
export const fetchCartByUserIdAction = createAsyncThunk(
  "cart/fetchByUserId",
  async (getuserId) => {
    const userId = Number(getuserId);
    // const { data } = await Client.query({ query: GET_CART_QUERY });
    const { data } = await Client.mutate({
      mutation: GET_CART_QUERY,
      variables: { userId },
    });

    return data.cartByUserId;
  }
);
