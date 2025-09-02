import { gql } from "@apollo/client";

export const GET_RESTAURANTSS = gql`
  query GetRestaurants($restaurantId: Int!, $searchText: String!, $categoryName: String!) {
    restaurants(where: { restaurantId: { eq: $restaurantId } }, input: { searchText: $searchText, categoryName: $categoryName }) {
      averageRating
      createdAt
      rating
      ratingsCount
      restaurantId
      restaurantName
      imageUrl
      updatedAt
      menus {
        averageRating
        cuisineType
        description
        isAvailable
        isVeg
        menuId
        name
        price
        rating
        ratingsCount
        imageUrl
      }
      branches {
        address
        city
        houseNumber
        imagename
        imageUrl
        locality
        phoneNumber
        postalCode
        state
        streetName
      }
    }
  }
`;