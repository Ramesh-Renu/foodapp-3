import { gql } from '@apollo/client';

// Query to fetch all cuisine types
export const FETCH_CUISINE_TYPES = gql`
  query {
    cousineTypes(where: null) {
      cuisineTypeId
      name
    }
  }
`;

// Mutation to add a new cuisine type
export const ADD_CUISINE_TYPE = gql`
  mutation createCuisineType($name: String!) {
    createCuisineType(name: $name) {
      message
      success
      data {
        cuisineTypeId
        name
      }
    }
  }
`;

// Mutation to edit an existing cuisine type
export const EDIT_CUISINE_TYPE = gql`
  mutation updateCuisineType($cuisineTypeId: Int!, $name: String!) {
    updateCuisineType(cuisineTypeId: $cuisineTypeId, name: $name) {
      message
      success
      data {
        cuisineTypeId
        name
      }
    }
  }
`;

// Mutation to delete a cuisine type
export const DELETE_CUISINE_TYPE = gql`
  mutation deleteCuisineType($cuisineTypeId: Int!) {
    deleteCuisineType(cuisineTypeId: $cuisineTypeId) {
      message
      success
      data {
        cuisineTypeId
        name
      }
    }
  }
`;
