import _ from 'lodash';

const initialState = {
  loading: false,
  categories: [],
  error: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CATEGORIES_REQUEST':
      return {
        ...state,
        loading: true,
      };

    case 'FETCH_CATEGORIES_SUCCESS':
      return {
        loading: false,
        categories: action.payload.categories,
        error: '',
        isSelected: _.map(action.payload.categories, (category) => {
          category.isSelected = false;
        }),
      };

    case 'FETCH_CATEGORIES_FAILURE':
      return {
        loading: false,
        categories: [],
        error: action.payload,
      };

    case 'CHANGE_CATEGORY_STATUS':
      return {
        ...state,
        btnStatus: action.payload,
        categories: _.map(state.categories, (category) => ({
          ...category,
          isSelected:
            category.name === action.name
              ? !category.isSelected
              : category.isSelected,
        })),
      };

    case 'FORBID_ALL':
      return {
        ...state,
        categories: _.map(state.categories, (category) => ({
          ...category,
          isSelected: false,
        })),
      };

    case 'APPROVE_ALL':
      return {
        ...state,
        categories: _.map(state.categories, (category) => ({
          ...category,
          isSelected: true,
        })),
      };

    default:
      return state;
  }
};

export default reducer;
