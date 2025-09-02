import { profileFailure, profileSuccess, startLoading } from '../slicer/UserProfileSlicer';
import client from '../../ApolloClient'; 
import { CREATE_USER_PROFILE } from '../query/UserProfileQuery';


export const createUserProfileAction = (userId, firstName, lastName) => async (dispatch) => {
    dispatch(startLoading());
    try {
      const userIdInt = parseInt(userId, 10); // Ensure userId is an integer  
      const { data } = await client.mutate({
        mutation: CREATE_USER_PROFILE,
        variables: { userId: userIdInt, firstName, lastName },
      });
  
      if (data.createUserProfile.success) {
        dispatch(profileSuccess(data.createUserProfile));
      } else {
        dispatch(profileFailure(data.createUserProfile.message || 'Failed to create user profile'));
      }
    } catch (error) {
      dispatch(profileFailure(error.message));
    }
  };
  