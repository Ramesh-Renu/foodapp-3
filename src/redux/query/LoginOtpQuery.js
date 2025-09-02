import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation RegisterUser($phoneNumber: String!) {
    registerUser(input: { phoneNumber: $phoneNumber }) {
      message
      success
      data {
        otpCode
        user {
          userId
          username
          email
          phoneNumber
          isEmailVerified
          isMobileVerified
        }
      }
    }
  }
`; 

export const VERIFY_OTP = gql`
  mutation VerifyOtp($otpCode: String!, $phoneNumber: String!) {
    verifyWebOtp(input: { otpCode: $otpCode, phoneNumber: $phoneNumber }) {
      message
      success
      data {
        isVerified
        message
      }
    }
  }
`;

export const GET_USER_DETAILS = gql`
  query GetUserDetails($userId: Int!) {
    userDetails(id: $userId) {
      email
      isEmailVerified
      isMobileVerified
      phoneNumber
      userId
      userProfiles {
        firstName
        lastName
        profilePictureUrl
        userId
        userProfileId
      }
    }
  }
`; 
