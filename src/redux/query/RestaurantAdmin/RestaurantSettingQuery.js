import { gql } from '@apollo/client';

export const GET_RESTAURANT_DETAILS = gql`
  query GetRestaurantDetails($restaurantId: Int!) {
    restaurants(input: { searchText: "" }, where: { restaurantId: { eq: $restaurantId } }) {
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
        branchId
        city
        houseNumber
        locality
        phoneNumber
        postalCode
        state
        streetName
      }
    }
  }
`;

export const UPDATE_RESTAURANT_AND_BRANCH = gql`
  mutation UpdateRestaurantAndBranch(
    $restaurantId: Int!
    $branchId: Int!
    $houseNumber: String!
    $streetName: String!
    $locality: String!
    $city: String!
    $state: String!
    $postalCode: String!
    $phoneNumber: String!
  ) {
    updateRestaurantAndBranch(
      restaurantId: $restaurantId
      branchId: $branchId
      houseNumber: $houseNumber
      streetName: $streetName
      locality: $locality
      city: $city
      state: $state
      postalCode: $postalCode
      phoneNumber: $phoneNumber
    ) {
      message
      success
      data {
        restaurantName
        branches {
          branchId
          city
          houseNumber
          locality
          phoneNumber
          restaurantId
          state
          streetName
        }
        restaurantId
      }
    }
  }
`;
