import { gql } from "@apollo/client";
// Create Cart
export const CREATE_CART_MUTATION = gql`
  mutation CreateCart($input: CreateCartInput!) {
    createCart(input: $input) {
      data {
        cart {
          cartId
          createdAt
          discountAmount
          finalAmount
          gstamount
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

// Update Cart
export const UPDATE_CART_MUTATION = gql`
  mutation UpdateCart($input: UpdateCartInput!) {
    updateCartNew(input: $input) {
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
    }
  }
`;

export const DELETE_CART_MUTATION = gql`
  mutation DeleteCart($input: DeleteCartInput!) {
    deleteCart(input: $input) {
      success
      message
    }
  }
`;

// Fetch Cart by User ID
export const GET_CART_QUERY = gql`
  query cartByUserId($userId: Int!) {
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
      imageUrl
      rating
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
        menuDescription
      }
        branch {
              address
              branchId
              branchName
              city
              createdAt
              houseNumber
              imagedata
              imagename
              imageUrl
              latitude
              locality
              longitude
              phoneNumber
              postalCode
              restaurantId
              state
              streetName
              updatedAt
            }
    }
  }
`;
