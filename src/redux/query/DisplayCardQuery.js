import { gql } from '@apollo/client';

export const GET_USER_CARDS = gql`
  query GetUserCards($id: Int!) {
    userDetails(id: $id) {
      userCards {
        billingAddress
        cardHolderName
        cardId
        cardNumber
        createdAt
        cvv
        expiryDate
        updatedAt
        userId
      }
    }
  }
`;

export const DELETE_USER_CARD = gql`
  mutation DeleteUserCard($cardId: Int!) {
    deleteUserCard(cardId: $cardId) {
      message
      success
    }
  }
`;
