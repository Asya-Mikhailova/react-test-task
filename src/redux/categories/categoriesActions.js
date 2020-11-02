import axios from 'axios';

export const fetchCategories = () => {
  return async (dispatch) => {
    dispatch(fetchCategoriesRequest());
    const response = await axios.get('http://localhost:3004/categories');
    const categories = await response.data;
    setTimeout(() => {
      //       // to emulate some network delay
      dispatch(fetchCategoriesSuccess(categories));
    }, 2000);
  };
};

export const fetchCategoriesRequest = () => {
  return {
    type: 'FETCH_CATEGORIES_REQUEST',
  };
};

export const fetchCategoriesSuccess = (categories) => {
  return {
    type: 'FETCH_CATEGORIES_SUCCESS',
    payload: categories,
  };
};

export const fetchCategoriesFailure = (error) => {
  return {
    type: 'FETCH_CATEGORIES_FAILURE',
    payload: error,
  };
};

export const setIsSelected = (name) => ({
  type: 'SET_SELECTED',
  name,
});

// export const forbidAllIsSelected = (categories) => ({
//   type: 'FORBID_ALL_SELECTED',
//   categories,
// });

// export const approveAllIsSelected = (categories) => ({
//   type: 'APPROVE_ALL_SELECTED',
//   categories,
// });
