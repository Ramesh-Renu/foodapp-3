// C:\ccs\Project\FoodApp Sprint\src\redux\action\HomeBranchCountAction.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import { FETCH_LOCALITIES_QUERY } from "../query/HomePageRestaurantQuery";
import Client from "../../ApolloClient";

// AsyncThunk to fetch localities
export const fetchLocalities = createAsyncThunk(
    'location/fetchLocalities',
    async (city) => {
        const response = await Client.query({
            query: FETCH_LOCALITIES_QUERY,
            variables: { city },
        });
        return response.data.restaurants.flatMap((restaurant) => restaurant.branches);
    }
);
