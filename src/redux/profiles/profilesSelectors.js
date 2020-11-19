//import _ from 'lodash';


import _ from "lodash";

export const loadingSelector = (state) => state.profiles.loading;
export const profilesSelector = (state) => state.profiles.profiles;
export const errorSelector = (state) => state.profiles.error;
export const allCategoriesSelector = (state)=> state.categories.categories;
export const activeProfileSelector = (state, id) => state.profiles.profiles.find(profile=>profile.id===id);
export const approvedProfileCategoriesSelector =(state, id) =>{
    const activeProfile = state=>activeProfileSelector(state,id);
    if(!activeProfile(state)){
        return []
    } else {
        return activeProfile(state).categories;
    }
}
export const forbiddenProfileCategoriesSelector = (state,id)=>{
    const approvedCategories = state => approvedProfileCategoriesSelector(state, id);
    const allCategories = state =>allCategoriesSelector(state);

    return allCategories(state).filter(categoryAll=>{
        return !approvedCategories(state).find(categoryApproved=>{
            return categoryAll.name === categoryApproved.name;
        })

    })
}


