import { gql } from "@apollo/client";
// Fetch Cart by User ID
export const fetchCartByUserId = createAsyncThunk(
  "cart/fetchByUserId",
  async (userId) => {
    const { data } = await Client.query({ query: GET_CART_QUERY });
    return data.cartByUserId;
  }
);
