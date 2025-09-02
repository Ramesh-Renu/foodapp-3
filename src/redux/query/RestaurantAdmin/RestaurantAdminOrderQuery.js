import { gql } from "@apollo/client";


// GraphQL query to fetch orders by restaurant ID
export const GET_ORDERS_BY_RESTAURANT_ID = gql`
  query GetOrdersByRestaurantId($restaurantid: Int!) {
    ordersByRestaurantId(restaurantid: $restaurantid) {
      orders {
        orderId
        orderDate
        phoneNumber
        totalAmount
        userId
        orderStatus
        orderDetails {
          menuId
          quantity
          price
          itemName
        }
      }
    }
  }
`;

export const UPDATE_ORDER_TRACK_STATUS = gql`
  mutation UpdateOrderTrackStatus($orderId: Int!, $status: OrderTrackStatus!) {
    updateOrderTrackStatus(orderId: $orderId, status: $status) {
      data
      message
      success
    }
  }
`;
