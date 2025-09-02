import { gql } from '@apollo/client';

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserAndProfile(
    $userId: Int!
    $phoneNumber: String!
    $email: String!
    $profileId: Int!
    $firstName: String!
    $lastName: String!
  ) {
    updateUser(userId: $userId, phoneNumber: $phoneNumber, email: $email) {
      message
      success
      data {
        createdAt
        email
        isEmailVerified
        isMobileVerified
        phoneNumber
        updatedAt
        userId
      }
    }
    updateUserProfile(id: $profileId, firstName: $firstName, lastName: $lastName) {
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