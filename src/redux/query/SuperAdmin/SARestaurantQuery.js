import { gql } from "@apollo/client";

export const GET_SAR = gql`
  query GetRestaurants($searchText: String!) {
    restaurants(input: { searchText: $searchText }) {
     averageRating
    createdAt
    imagedata
    imagename
    imageUrl
    rating
    ratingsCount
    restaurantId
    restaurantName
    updatedAt
    branches {
      address
      branchId
      city
      createdAt
      houseNumber
      imagedata
      imagename
      imageUrl
      latitude
      locality
      longitude
      phoneNumber
      postalCode
      state
      streetName
      updatedAt
    }
    cuisineTypes {
      cuisineTypeId
      imagedata
      imagename
      imageUrl
      name
    }
  }
}
`;


export const CREATE_SAR = gql`
 mutation createRestaurantWithBranch(
  $restaurantName: String!
  $rating: Decimal!
  $averageRating: Decimal!
  $ratingCount: Int!
  $branchAddress: String!
  $streetName: String!
  $houseNumber: String!
  $locality: String!
  $city: String!
  $state: String!
  $postalCode: String!
  $phoneNumber: String!
  $latitude: Decimal!
  $longitude: Decimal!
  $branchName: String!
  $cuisineTypeIds: [Int!]! # Updated type
) {
  createRestaurantWithBranch(
    restaurantName: $restaurantName
    rating: $rating
    averageRating: $averageRating
    ratingCount: $ratingCount
    branchAddress: $branchAddress
    streetName: $streetName
    houseNumber: $houseNumber
    locality: $locality
    city: $city
    state: $state
    postalCode: $postalCode
    phoneNumber: $phoneNumber
    latitude: $latitude
    longitude: $longitude
    branchName: $branchName
    cuisineTypeIds: $cuisineTypeIds 
  ) {
     message
    success
    data {
      averageRating
      createdAt
      imagedata
      imagename
      imageUrl
      rating
      ratingsCount
      restaurantId
      restaurantName
      updatedAt
      branches {
        address
        branchId
        branchName
        city
        createdAt
        houseNumber
        imagedata
        imagename
        imageUrl
        latitude
        locality
        longitude
        phoneNumber
        postalCode
        restaurantId
        state
        streetName
        updatedAt
      }
      cuisineTypes {
        cuisineTypeId
        imagedata
        imagename
        imageUrl
        name
      }
    }
  }
}
`;


export const UPDATE_SAR = gql`
  mutation UpdateRestaurantAndBranch(
  $restaurantId: Int!
  $branchId: Int!
  $restaurantName: String!
  $rating: Decimal!
  $averagerating: Decimal!
  $ratingcount: Int!
  $branchAddress: String!
  $houseNumber: String!
  $streetName: String!
  $locality: String!
  $city: String!
  $state: String!
  $postalCode: String!
  $phoneNumber: String!
  $latitude: Decimal!
  $longitude: Decimal!
  $branchName: String!
  $cuisineTypeIds: [Int!]!
) {
  updateRestaurantAndBranch(
    restaurantId: $restaurantId
    branchId: $branchId
    restaurantName: $restaurantName
    rating: $rating
    averagerating: $averagerating
    ratingcount: $ratingcount
    branchAddress: $branchAddress
    houseNumber: $houseNumber
    streetName: $streetName
    locality: $locality
    city: $city
    state: $state
    postalCode: $postalCode
    phoneNumber: $phoneNumber
    latitude: $latitude
    longitude: $longitude
    branchName: $branchName
    cuisineTypeIds: $cuisineTypeIds
  ) {
      message
    success
    data {
      averageRating
      createdAt
      imagedata
      imagename
      imageUrl
      rating
      ratingsCount
      restaurantId
      restaurantName
      updatedAt
      branches {
        address
        branchId
        branchName
        city
        createdAt
        houseNumber
        imagedata
        imagename
        imageUrl
        latitude
        locality
        longitude
        phoneNumber
        postalCode
        restaurantId
        state
        streetName
        updatedAt
      }
      cuisineTypes {
        cuisineTypeId
        imagedata
        imagename
        imageUrl
        name
      }
    }
  }
}
`;