import { gql } from "@apollo/client";

// Queries and Mutations
export const GET_MENUS = gql`
  query GetMenus($restaurantId: Int!) {
    menus(restaurantId: $restaurantId) {
      averageRating
      branchId
      categoryId
      createdAt
      description
      gstSlabId
      imagedata
      imagename
      imageUrl
      isAvailable
      isVegetarian
      itemName
      menuId
      price
      ratingsCount
      restaurantId
      updatedAt
    }
  }
`;

export const CREATE_MENU = gql`
  mutation CreateMenu(
    $restaurantId: Int!
    $itemName: String!
    $price: Decimal!
    $isVegetarian: Boolean!
    $categoryId: Int!
    $categoryIds: [Int!]
    $description: String!
    $isAvailable: Boolean!
    $gstSlabId: Int!
  
  ) {
    createMenu(
      restaurantId: $restaurantId
      itemName: $itemName
      price: $price
      isVegetarian: $isVegetarian
      categoryId: $categoryId
      categoryIds:  $categoryIds
      description: $description
      gstSlabId: $gstSlabId
      isAvailable: $isAvailable
      imagefile: null
    ) {
      message
      success
      data {
        averageRating
        branchId
        categoryId
        createdAt
        description
        gstSlabId
        imagedata
        imagename
        imageUrl
        isAvailable
        isVegetarian
        itemName
        menuId
        price
        ratingsCount
        restaurantId
        updatedAt
      }
    }
  }
`;

export const UPDATE_MENU = gql`
  mutation UpdateMenu(
    $menuId: Int!
    $itemName: String!
    $price: Decimal!
    $isVegetarian: Boolean!
    $categoryId: Int!
    $categoryIds: [Int!]
    $description: String!
    $isAvailable: Boolean!
    $gstSlabId: Int!
   
  ) {
    updateMenu(
      menuId: $menuId
      itemName: $itemName
      price: $price
      isVegetarian: $isVegetarian
      categoryId: $categoryId
      categoryIds: $categoryIds
      description: $description
      gstSlabId: $gstSlabId
      isAvailable: $isAvailable
      imagefile: null
    ) {
      message
      success
      data {
        averageRating
        branchId
        categoryId
        createdAt
        description
        gstSlabId
        imagedata
        imagename
        imageUrl
        isAvailable
        isVegetarian
        itemName
        menuId
        price
        ratingsCount
        restaurantId
        updatedAt
      }
    }
  }
`;

export const REMOVE_MENU = gql`
  mutation RemoveMenu($menuId: Int!) {
    removeMenu(menuId: $menuId) {
      message
      success
      data {
        averageRating
        branchId
        categoryId
        createdAt
        description
        gstSlabId
        imagedata
        imagename
        imageUrl
        isAvailable
        isVegetarian
        itemName
        menuId
        price
        ratingsCount
        restaurantId
        updatedAt
      }
    }
  }
`;

export const GET_HOMEPAGE_CATEGORIES = gql`
  query {
    categoryBy {
      categoryId
      categoryName
      createdAt
      imagedata
      imagename
      imageUrl
      updatedAt
    }
  }
`;
export const GET_RESTAURANT_BRANCHES = gql`
  query GetRestaurantBranches($restaurantId: Int!) {
    restaurants(input: { searchText: "" }, where: { restaurantId: { eq: $restaurantId } }) {
      branches {
        branchId
        locality
      }
    }
  }
`;