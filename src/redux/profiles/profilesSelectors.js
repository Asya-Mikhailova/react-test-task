//import _ from 'lodash';

export const loadingSelector = (state) => state.profiles.loading;
export const profilesSelector = (state) => state.profiles.profiles;
export const errorSelector = (state) => state.profiles.error;
export const approvedProfileCategoriesSelector = (state) =>
  state.profiles.profiles.map((profile) =>
    profile.categories.map((category) => {
      return (category.isSelected = true);
    })
  );
