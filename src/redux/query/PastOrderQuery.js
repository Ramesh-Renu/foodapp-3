import { gql } from "@apollo/client";

export const GET_PAST_ORDERS = gql`
  query get_past_orders($id: Int!) {
    userDetails(
      id: $id
      where: { orders: { all: { orderStatus: { eq: "OutForDelivery" } } } }
    ) {
      orders {
        actualDeliveryTime
        orderDate
        orderId
        restaurant {
          imageUrl
          restaurantName
          branch {
            city
            locality
          }
        }
        orderDetails {
          menuId
          price
          quantity
          menu {
            itemName
            menuId
          }
          orderDetailId
        }
        totalAmount
        paymentMethod
      }
    }
  }
`;
