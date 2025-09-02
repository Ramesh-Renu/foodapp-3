import Client from '../../ApolloClient';
import { REGISTER_USER, VERIFY_OTP } from '../query/LoginOtpQuery';
import { setError, setLoading, setUserId } from '../slicer/LoginOtpSlicer';

export const registerUser = (phoneNumber) => async (dispatch, getState, client) => {
  dispatch(setLoading(true));
  try {
    const { data } = await Client.mutate({
      mutation: REGISTER_USER,
      variables: { phoneNumber },
    });
    console.log('OTP Code:', data.registerUser.data.otpCode);
    dispatch(setLoading(false));
    return data.registerUser;
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export const verifyOtp = (otpCode, phoneNumber) => async (dispatch, getState, client) => {
  dispatch(setLoading(true));
  try {
    const { data } = await client.mutate({
      mutation: VERIFY_OTP,
      variables: { otpCode, phoneNumber },
    });
    if (data.verifyOtp.success) {
      dispatch(setUserId(data.verifyOtp.data.user));
    }
    dispatch(setLoading(false));
    return data.verifyOtp;
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};