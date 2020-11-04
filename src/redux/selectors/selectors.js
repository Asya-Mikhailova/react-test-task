import _ from 'lodash';

export const loadingSelector = (state) => state.categories.loading;
export const categoriesSelector = (state) => state.categories.categories;
export const errorSelector = (state) => state.categories.error;
export const forbidFilterSelector = (state) =>
  _.filter(state.categories.categories, { isSelected: false });
export const approveFilterSelector = (state) =>
  _.filter(state.categories.categories, { isSelected: true });
