//D:\food_app_dev\FoodApp Sprint\src\redux\query\GetCartQuery.js

import { gql } from "@apollo/client";

export const GET_CART_QUERY = gql`
      query($userId: Int!) {
        cartByUserId(userId: $userId) {
          cartId
          createdAt
          discountAmount
          finalAmount
          gstAmount
          itemTotal
          packagingCharges
          restaurantId
          restaurantName
          serviceCharge
          status
          updatedAt
          userId
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