import axios from 'axios';

export const fetchProfiles = () => async (dispatch) => {
  dispatch(fetchProfilesRequest());
  try {
    const { data } = await axios.get('http://localhost:3004/profiles');
    dispatch(fetchProfilesSuccess(data.profiles));
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

export const changeProfileCategoryStatus = (name,id) => ({
  type: 'CHANGE_PROFILE_CATEGORY_STATUS',
  payload: {id, name}
});

export const forbidAllPC = (id) => ({
  type: 'FORBID_ALL_PC',
  payload:id,

});

export const approveAllPC = (idAp,categoriesAp) => ({
  type: 'APPROVE_ALL_PC',
  payload:{idAp,categoriesAp}
});


