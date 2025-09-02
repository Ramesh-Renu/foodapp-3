import { gql } from '@apollo/client';

export const LOGIN_RESTAURANT_USER = gql`
  mutation LoginRestaurantUser($username: String!, $password: String!) {
    loginRestaurantUser(username: $username, password: $password) {
      message
      success
      data {
        createdAt
        email
        isActive
        isSuperAdmin
        passwordHash
        restaurantId
        restaurantUserId
        updatedAt
        username
      }
    }
  }
`;