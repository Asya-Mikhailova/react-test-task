import axios from 'axios';

export const fetchCategories = () => {
  return (dispatch) => {
    dispatch(fetchCategoriesRequest());
    axios
      .get('http://localhost:3004/categories')
      .then((response) => {
        const categories = response.data;
        setTimeout(() => {
          // to emulate some network delay
          dispatch(fetchCategoriesSuccess(categories));
        }, 2000);
      })
      .catch((error) => {
        dispatch(fetchCategoriesFailure(error.message));
      });
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
