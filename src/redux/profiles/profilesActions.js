import axios from 'axios';

export const fetchProfiles = () => async (dispatch) => {
  dispatch(fetchProfilesRequest());
  try {
    const { data } = await axios.get('http://localhost:3004/profiles');
    dispatch(fetchProfilesSuccess(data));
  } catch (error) {
    dispatch(fetchProfilesFailure(error));
  }
};

export const fetchProfilesRequest = () => {
  return {
    type: 'FETCH_PROFILES_REQUEST',
  };
};

export const fetchProfilesSuccess = (profiles) => {
  return {
    type: 'FETCH_PROFILES_SUCCESS',
    payload: profiles,
  };
};

export const fetchProfilesFailure = (error) => {
  return {
    type: 'FETCH_PROFILES_FAILURE',
    payload: error,
  };
};
