import { gql } from '@apollo/client';

export const GET_RESTAURANTS_BY_LOCALITY = gql`
  query GetRestaurantsByLocality($locality: String!) {
    restaurants(
      input: { searchText: "" }
      where: { branches: { all: { locality: { eq: $locality } } } }
    ) {
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
