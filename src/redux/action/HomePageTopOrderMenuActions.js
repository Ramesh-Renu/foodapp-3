import { createAsyncThunk } from '@reduxjs/toolkit';
import Client from '../../ApolloClient';
import { FETCH_TOP_ORDERED_MENUS_QUERY } from '../query/HomePageTopOrderMenuQuery';
// Fetch the top ordered menus (API call)
export const fetchTopOrderedMenus = createAsyncThunk(
  'menu/fetchTopOrderedMenus',
  async () => {
    console.log('Fetching top ordered menus...');

    const response = await Client.query({
      query: FETCH_TOP_ORDERED_MENUS_QUERY
    });

    console.log('API response:', response);

    // Process the response and extract the ordered menu items
    const orders = response.data.restaurants.flatMap(restaurant =>
      restaurant.branches.flatMap(branch =>
        branch.orders
          .filter(order => order.orderStatus === 'Pending')
          .flatMap(order => order.orderDetails.map(detail => detail.itemName))
      )
    );

    // Count the occurrences of each menu item
    const itemCounts = orders.reduce((counts, item) => {
      counts[item] = (counts[item] || 0) + 1;
      return counts;
    }, {});

    // Sort items based on their popularity
    const sortedItems = Object.keys(itemCounts)
      .sort((a, b) => itemCounts[b] - itemCounts[a])
      .slice(0, 8);

    console.log('Top ordered items:', sortedItems);
    return sortedItems;
  }
);
