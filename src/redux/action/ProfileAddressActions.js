import { fetchUserAddresses, addUserAddress, updateUserAddress } from '../slicer/ProfileAddressSlicer';

// Action to get user addresses
export const createUserAddressAction = (userId, addressData) => async (dispatch) => {
  try {
    await dispatch(addUserAddress({ userId, ...addressData }));
    // Fetch updated addresses after adding new address
    await dispatch(fetchUserAddresses(userId));
  } catch (error) {
    console.error('Failed to create user address:', error);
  }
};

export const updateUserAddressAction = (addressId, updatedAddress, userId) => async (dispatch) => {
  try {
    await dispatch(updateUserAddress({ addressId, updatedAddress, userId }));
    // Fetch updated addresses after updating address
    await dispatch(fetchUserAddresses(userId));
  } catch (error) {
    console.error('Failed to update user address:', error);
  }
};
