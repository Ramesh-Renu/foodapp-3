import { gql } from "graphql-request";

export const GET_RESTAURANTS = gql`
  query GetRestaurants($searchText: String!) {
    restaurants(input: { searchText: $searchText }) {
      branches {
        locality
        branchId
        city
      }
    }
  }
`;
