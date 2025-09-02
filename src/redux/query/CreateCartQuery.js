//D:\food_app_dev\FoodApp Sprint\src\redux\query\CreateCartQuery.js

import { gql } from '@apollo/client';

export const CREATE_CART_MUTATION = gql`
  mutation CreateCart($input: CreateCartInput!) {
    createCart(input: $input) {
      data {
        cart {
          cartId
          createdAt
          discountAmount
          finalAmount
          itemTotal
          restaurantId
          status
          updatedAt
          userId
          cartItems {
            cartItemId
            menuItemId
            quantity
            totalPrice
            unitPrice
          }
        }
      }
      message
      success
    }
  }
`;


