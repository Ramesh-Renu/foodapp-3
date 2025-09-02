import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from '../../ApolloClient';
import { GET_USER_ADDRESSES, CREATE_USER_ADDRESS, UPDATE_USER_ADDRESS } from '../query/ProfileAddressQuery';

export const fetchUserAddresses = createAsyncThunk(
  'userAddresses/fetchUserAddresses',
  async (userId) => {
    const parsedUserId = Number.isInteger(userId) ? userId : parseInt(userId, 10);
    
    if (isNaN(parsedUserId)) {
      throw new Error("Invalid userId: must be an integer");
    }

    const { data } = await client.query({
      query: GET_USER_ADDRESSES,
      variables: { userId: parsedUserId },
      fetchPolicy: 'network-only' 
    });
    return data.userDetails.userRegularAddresses;
  }
);

export const addUserAddress = createAsyncThunk(
  'userAddresses/addUserAddress',
  async ({ userId, ...addressData }) => {
    const formattedAddressData = {
      ...addressData,
      userId: parseInt(userId, 10),
      latitude: parseFloat(addressData.latitude),
      longitude: parseFloat(addressData.longitude),
    };

    if (isNaN(formattedAddressData.latitude) || isNaN(formattedAddressData.longitude)) {
      throw new Error("Invalid latitude or longitude");
    }

    const { data } = await client.mutate({
      mutation: CREATE_USER_ADDRESS,
      variables: formattedAddressData,
      refetchQueries: [
        {
          query: GET_USER_ADDRESSES,
          variables: { userId: parseInt(userId, 10) }
        }
      ]
    });
    return data.createUserRegularAddress;
  }
);

export const updateUserAddress = createAsyncThunk(
  'userAddresses/updateUserAddress',
  async ({ addressId, updatedAddress, userId }) => {
    // Format the data before sending to API
    const formattedAddress = {
      ...updatedAddress,
      latitude: parseFloat(updatedAddress.latitude),
      longitude: parseFloat(updatedAddress.longitude),
      addressId: parseInt(addressId, 10),
      // Ensure other numeric fields are properly parsed if needed
      postalCode: updatedAddress.postalCode.toString() // Keep postal code as string
    };

    // Validate the parsed values
    if (isNaN(formattedAddress.latitude) || isNaN(formattedAddress.longitude)) {
      throw new Error("Invalid latitude or longitude values");
    }

    const { data } = await client.mutate({
      mutation: UPDATE_USER_ADDRESS,
      variables: formattedAddress,
      refetchQueries: [
        {
          query: GET_USER_ADDRESSES,
          variables: { userId: parseInt(userId, 10) }
        }
      ]
    });
    return data.updateUserRegularAddress.data;
  }
);

const userAddressSlice = createSlice({
  name: 'userAddresses',
  initialState: {
    addresses: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAddresses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserAddresses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.addresses = action.payload;
      })
      .addCase(fetchUserAddresses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addUserAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addUserAddress.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload) {
          state.addresses.push(action.payload);
        }
      })
      .addCase(addUserAddress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateUserAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAddress.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload) {
          const index = state.addresses.findIndex(
            addr => addr.addressId === action.payload.addressId
          );
          if (index !== -1) {
            state.addresses[index] = action.payload;
          }
        }
      })
      .addCase(updateUserAddress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userAddressSlice.reducer;