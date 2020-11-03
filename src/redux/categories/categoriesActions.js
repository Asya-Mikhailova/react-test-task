import axios from 'axios';

export const fetchCategories = () => async (dispatch) => {
  dispatch(fetchCategoriesRequest());
  try {
    const { data } = await axios.get('http://localhost:3004/categories');
    setTimeout(() => {
      //       // to emulate some network delay
      dispatch(fetchCategoriesSuccess(data));
    }, 2000);
  } catch (error) {
    dispatch(fetchCategoriesFailure(error));
  }
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

export const changeCategoryStatus = (name) => ({
  type: 'CHANGE_CATEGORY_STATUS',
  name,
});

export const forbidAll = (name) => ({
  type: 'FORBID_ALL',
  name,
});

export const approveAll = (name) => ({
  type: 'APPROVE_ALL',
  name,
});
