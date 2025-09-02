import { createSelector } from "reselect";

export const cartSelector = createSelector(
  [
    (state) => state.cart.data,
    (state) => state.cart.loading,
    (state) => state.cart.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);
