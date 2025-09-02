import { setCartItems, setLoading, setError } from '../slicer/DisplayCartSlicer';
import { GET_CART_ITEMS } from '../query/DisplayCartQuery';
import Client from '../../ApolloClient';

export const fetchCartItems = (userId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await Client.query({
      query: GET_CART_ITEMS,
      variables: { userId }
    });

    const cartItems = data?.cartByUserId?.cartItems || [];
    dispatch(setCartItems(cartItems));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};
