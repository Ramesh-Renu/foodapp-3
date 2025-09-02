// C:\CrestClimbers\Projects\foodapp\src\Redux\Action\CategoryAction.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import Client from '../../ApolloClient';
import { GET_HOMEPAGE_CATEGORY } from '../query/HomePageCategoryQuery';
import { GET_CATEGORY } from '../query/CategoryQuery';

// Create an async thunk to fetch categories
export const getCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await Client.query({
      query: GET_HOMEPAGE_CATEGORY,
    });
    // Ensure correct path to categories in the response data
    return response.data.categorys
  }
);

export const categories = createAsyncThunk(
  'restaurants/fetchRestaurants',
  async ({ categoryName }) => {
    try {
      const response = await Client.query({
        query: GET_CATEGORY,
        variables: { categoryName },
      });
      return response.data.restaurants;
    } catch (error) {
      throw new Error("Failed to fetch restaurants: " + error.message);
    }
  }
);


// //C:\CrestClimbers\Projects\foodapp\src\Redux\Action\CategoryAction.js
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { fetchCategories } from '../../Services/Service'; // Adjusted import path

// // Create an async thunk to fetch categories
// export const getCategories = createAsyncThunk('categories/getCategories', async () => {
//     try {
//         const response = await fetchCategories();

//         const uniqueCategories = new Map(); // Using a Map to maintain unique categories

//         // Iterate through restaurants and their menus
//         response.data.restaurants.forEach(restaurant => {
//             restaurant.menus.forEach(menu => {
//                 const category = menu.category;
//                 // Use categoryId as the key to ensure uniqueness
//                 uniqueCategories.set(category.categoryId, category);
//             });
//         });

//         // Return an array of unique categories
//         return Array.from(uniqueCategories.values());
//     } catch (error) {
//         // Handle any errors here (optional)
//         console.error('Failed to fetch categories:', error);
//         throw error; // Propagate the error for Redux to handle
//     }
// });
