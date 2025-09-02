import { gql } from '@apollo/client';

export const GET_CART_ITEMS = gql`
  query GetCartItems($userId: Int!) {
    cartByUserId(userId: $userId) {
      cartItems {
        cartItemId
        discountAmount
        gstAmount
        imageUrl
        menuItemId
        menuItemName
        quantity
        restaurantId
        totalPrice
        unitPrice
      }
    }
  }
`;
