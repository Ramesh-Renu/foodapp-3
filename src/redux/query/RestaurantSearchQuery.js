import { gql } from "@apollo/client";

export const GET_RESTAURANTS = gql`
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
    }
  }
`;
