import { gql } from '@apollo/client';


export const CREATE_USER_PROFILE = gql`
  mutation CreateUserProfile($userId: Int!, $firstName: String!, $lastName: String!) {
    createUserProfile(userId: $userId, firstName: $firstName, lastName: $lastName) {
      message
      success
      data {
        firstName
        lastName
        userId
        userProfileId
      }
    }
  }
`;
