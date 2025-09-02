import { gql } from "@apollo/client";

// Fetch Categories
export const GET_HOMEPAGE_CATEGORIES = gql`
  query {
    categoryBy {
      categoryId
      categoryName
      createdAt
      imagename
      imageUrl
      updatedAt
    }
  }
`;

// Create Category Mutation
export const CREATE_CATEGORY_MUTATION = gql`
  mutation CreateCategory($categoryName: String!) {
    createCategory(categoryName: $categoryName) {
      message
      success
      data {
        categoryId
        categoryName
        createdAt
        imagename
        imageUrl
        updatedAt
      }
    }
  }
`;

// Update Category Mutation
export const UPDATE_CATEGORY_MUTATION = gql`
  mutation UpdateCategory($categoryId: Int!, $categoryName: String!) {
    updateCategory(categoryId: $categoryId, categoryName: $categoryName) {
      message
      success
      data {
        categoryId
        categoryName
        createdAt
        imagename
        imageUrl
        updatedAt
      }
    }
  }
`;

// Delete Category Mutation
export const DELETE_CATEGORY_MUTATION = gql`
  mutation DeleteCategory($categoryId: Int!) {
    deleteCategory(categoryId: $categoryId) {
      message
      success
      data {
        categoryId
        categoryName
        createdAt
        imagename
        imageUrl
        updatedAt
      }
    }
  }
`;
