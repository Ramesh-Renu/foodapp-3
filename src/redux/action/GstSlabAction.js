import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_GST_SLAB } from "../query/GstSlabQuery";
import Client from "../../ApolloClient";


export const fetchGstSlabs = createAsyncThunk(
  "gstSlab/fetchGstSlabs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Client.query({
        query: GET_GST_SLAB,
      });
      return response.data.gstSlabBy; // Returning the fetched data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);