import { gql } from "@apollo/client";


export const UPDATE_CART_MUTATION = gql`
  mutation UpdateCart($input: UpdateCartInput!) {
    updateCartNew(input: $input) {
      data {
        cart {
          cartId
          finalAmount
          cartItems {
            menuItemId
            quantity
            totalPrice
          }
        }
      }
      message
      success
    }
  }
`;