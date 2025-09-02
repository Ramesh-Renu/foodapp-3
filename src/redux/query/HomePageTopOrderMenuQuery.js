import { gql } from '@apollo/client';

export const FETCH_TOP_ORDERED_MENUS_QUERY = gql`
  query {
    restaurants(
      input: { searchText: "" }
      where: { branches: { some: { orders: { some: { orderStatus: { eq: "Pending" } } } } } }
    ) {
      branches {
        orders {
          orderDetails {
            itemName
          }
          orderStatus
        }
      }
    }
  }
`;
