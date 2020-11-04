export const loadingSelector = (state) => state.categories.loading;
export const categoriesSelector = (state) => state.categories.categories;
export const errorSelector = (state) => state.categories.error;
export const forbidFilterSelector = (state) =>
  state.categories.categories.filter((category) => !category.isSelected);
export const approveFilterSelector = (state) =>
  state.categories.categories.filter((category) => category.isSelected);
