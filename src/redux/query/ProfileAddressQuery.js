import { gql } from '@apollo/client';

export const GET_USER_ADDRESSES = gql`
  query userDetails($userId: Int!) {
    userDetails(id: $userId) {
      userRegularAddresses {
        address
        addressId
        addressType
        city
        createdAt
        houseNumber
        latitude
        locality
        longitude
        postalCode
        state
        streetName
        updatedAt
        userId
      }
    }
  }
`;

export const CREATE_USER_ADDRESS = gql`
  mutation createUserRegularAddress(
    $userId: Int!
    $address: String!
    $addressType: String!
    $latitude: Decimal!
    $longitude: Decimal!
    $houseNumber: String!
    $streetName: String!
    $locality: String!
    $city: String!
    $state: String!
    $postalCode: String!
  ) {
    createUserRegularAddress(
      userId: $userId
      address: $address
      addressType: $addressType
      latitude: $latitude
      longitude: $longitude
      houseNumber: $houseNumber
      streetName: $streetName
      locality: $locality
      city: $city
      state: $state
      postalCode: $postalCode
    ) {
      message
      success
      data {
        address
        addressId
        addressType
        city
        createdAt
        houseNumber
        latitude
        locality
        longitude
        postalCode
        state
        streetName
        updatedAt
        userId
      }
    }
  }
`;  

export const UPDATE_USER_ADDRESS = gql`
  mutation updateUserRegularAddress(
    $addressId: Int!
    $address: String
    $addressType: String
    $latitude: Decimal
    $longitude: Decimal
    $houseNumber: String
    $streetName: String
    $locality: String
    $city: String
    $state: String
    $postalCode: String
  ) {
    updateUserRegularAddress(
      addressId: $addressId
      address: $address
      addressType: $addressType
      latitude: $latitude
      longitude: $longitude
      houseNumber: $houseNumber
      streetName: $streetName
      locality: $locality
      city: $city
      state: $state
      postalCode: $postalCode
    ) {
      message
      success
      data {
        address
        addressId
        addressType
        city
        createdAt
        houseNumber
        latitude
        locality
        longitude
        postalCode
        state
        streetName
        updatedAt
        userId
      }
    }
  }
`;
