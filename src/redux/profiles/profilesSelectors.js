export const loadingSelector = (state) => state.profiles.loading;
export const profilesSelector = (state) => state.profiles.profiles;
export const errorSelector = (state) => state.profiles.error;
export const allCategoriesSelector = (state)=> state.categories.categories;
export const activeProfileSelector = (state, id) => state.profiles.profiles[id];
export const approvedProfileCategoriesSelector =(state, id) =>{
    const activeProfile = activeProfileSelector(state,id);
    if(!activeProfile){
        return []
    } else {
        return activeProfile.categories;
    }
}
export const forbiddenProfileCategoriesSelector = (state,id)=>{
    const approvedCategories = approvedProfileCategoriesSelector(state, id);
    const allCategories = allCategoriesSelector(state);

    return allCategories.filter(categoryAll=>{
        return !approvedCategories.find(categoryApproved=>{
            return categoryAll.name === categoryApproved.name;
        })
    })
}





