import { gql } from "@apollo/client";

export const GET_CATEGORY = gql`
  query GetRestaurants($categoryName: String!) {
    restaurants(input: { categoryName: $categoryName }) {
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
    }
  }
`;
