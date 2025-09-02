import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartSelector } from "../redux/selector/cartSelector";
import {
  fetchCartByUserIdAction,
  createCartAction,
  updateCartAction,
  deleteCartAPIAction,
} from "../redux/action/CartAction";

/** TO GET CART LIST BY ID */
export const useCart = () => {
  const cartData = useSelector(cartSelector);
  const dispatch = useDispatch();

  /** TO GET ALL Cart */
  const getAllCart = useCallback(
    (params) => dispatch(fetchCartByUserIdAction(params)),
    [dispatch]
  );

  /** CREATE NEW CART */
  const createCart = useCallback(
    (params) => dispatch(createCartAction(params)),
    [dispatch]
  );

  /** UPDATE CART */
  const updateCart = useCallback(
    (data) => dispatch(updateCartAction(data)),
    [dispatch]
  );

  /** DELETE CART */
  const deleteCart = useCallback(
    (data) => dispatch(deleteCartAPIAction(data)),
    [dispatch]
  );
  return [
    cartData,
    {
      getAllCart,
      createCart,
      updateCart,
      deleteCart,
    },
  ];
};
