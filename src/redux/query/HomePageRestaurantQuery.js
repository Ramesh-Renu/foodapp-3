// C:\ccs\Project\FoodApp Sprint\src\redux\query\HomePageRestaurantQuery.js

import { gql } from "@apollo/client";

export const GET_HOMEPAGE_RESTAURANTS = gql`
  query GetNearbyRestaurants($latitude: Decimal!, $longitude: Decimal!, $radiusKm: Decimal!) {
    nearbyBranchesWithRestaurantDetails(
      customerLatitude: $latitude
      customerLongitude: $longitude
      radiusKm: $radiusKm
    ) {
      city
      latitude
      locality
      longitude
      restaurant {
        averageRating
        imagename
        imageUrl
        rating
        ratingsCount
        restaurantName
      }
      restaurantId
    }
  }
`;
export const FETCH_LOCALITIES_QUERY = gql`
query fetchLocalities($city: String!) {
  restaurants(
    input: { searchText: "" }
    where: { branches: { all: { city: { contains: $city } } } }
  ) {
    branches {
      city
      locality
    }
  }
}
`;

