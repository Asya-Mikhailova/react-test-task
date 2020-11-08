//import _ from 'lodash';

const initialState = {
  loading: false,
  profiles: [],
  error: '',
  isSelected: true,
};

const profilesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PROFILES_REQUEST':
      return {
        ...state,
        loading: true,
      };

    case 'FETCH_PROFILES_SUCCESS':
      return {
        loading: false,
        profiles: action.payload.profiles,
        error: '',
        isSelected: action.payload.profiles.map((profile) => {
          return profile.categories.map(
            (category) => (category.isSelected = true)
          );
        }),
      };

    case 'FETCH_PROFILES_FAILURE':
      return {
        loading: false,
        profiles: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export default profilesReducer;
