import _ from 'lodash';

const initialState = {
  loading: false,
  categories: [],
  error: '',
  isSelected: false,
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
        categories: action.payload,
        error: '',
        isSelected: _.map(action.payload, (category) => {
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

    case 'FILTER_CATEGORIES':
      return {
        ...state,
        categories: action.payload,
        // categories: state.categories,
        // filter: state.categories.filter((category) => {
        //   for (let categoryF of action.payload) {
        //     if (category === categoryF) return category;
        //   }
        // }),
      };

    default:
      return state;
  }
};

export default reducer;
