import { gql } from "@apollo/client";

export const GET_ORDERS_STATUS = gql`
  query OrdersStatusByUserId($userId: Int!) {
    ordersStatusByUserId(userid: $userId) {
      orders {
      actualDeliveryTime
      canceledTime
      confirmedTime
      deliveredTime
      deliveryAddress
      email
      estimatedDeliveryTime
      failedTime
      orderDate
      orderId
      orderPaymentStatus
      orderStatus
      outForDeliveryTime
      paymentMethod
      pendingTime
      phoneNumber
      preparingTime
      readyForPickupTime
      refundedTime
      totalAmount
      userId
      userName
      orderDetails {
        averageRating
        createdAt
        cuisineType
        description
        imagedata
        imagename
        imageUrl
        isAvailable
        isVeg
        itemName
        menuId
        name
        orderDetailsId
        orderId
        price
        quantity
        rating
        ratingsCount
        restaurantId
        updatedAt
      }
    }
  }
}`;
