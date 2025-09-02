import { gql } from "@apollo/client";

export const GET_RESTAURANT_USERS = gql`
  query GetRestaurantUsers {
    restaurantUsers {
      branchId
      createdAt
      email
      isActive
      isSuperAdmin
      passwordHash
      restaurantId
      restaurantUserId
      updatedAt
      username
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

// Mutation: Create Restaurant User
export const CREATE_RESTAURANT_USER = gql`
  mutation CreateRestaurantUser(
    $username: String!
    $password: String!
    $email: String!
    $restaurantId: Int!
  
  ) {
    createRestaurantUser(
      username: $username
      password: $password
      email: $email
      restaurantId: $restaurantId
   
    ) {
      message
      success
      data {
        branchId
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

// Mutation: Update Restaurant User
export const UPDATE_RESTAURANT_USER = gql`
  mutation UpdateRestaurantUser(
    $restaurantUserId: Int!
    $username: String!
    $email: String!
    $isActive: Boolean!
    $restaurantId: Int!
  ) {
    updateRestaurantUser(
      restaurantUserId: $restaurantUserId
      username: $username
      email: $email
      isActive: $isActive
      restaurantId: $restaurantId
     
    ) {
      message
      success
      data {
        branchId
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
export const GET_SAR = gql`
  query GetRestaurants($searchText: String!) {
    restaurants(input: { searchText: $searchText }) {
     averageRating
    createdAt
    imagedata
    imagename
    imageUrl
    rating
    ratingsCount
    restaurantId
    restaurantName
    updatedAt
    branches {
      address
      branchId
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
      state
      streetName
      updatedAt
    }
    cuisineTypes {
      cuisineTypeId
      imagedata
      imagename
      imageUrl
      name
    }
  }
}
`;