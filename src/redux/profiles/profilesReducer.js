import _ from "lodash";

const initialState = {
    loading: false,
    profiles: {},
    error: '',
};

const profilesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_PROFILES_REQUEST':
            return {
                ...state,
                loading: true,
            };

        case 'FETCH_PROFILES_SUCCESS':
            const profiles = action.payload;
            return {
                loading: false,
                profiles: _.keyBy(profiles, 'id'),
                listProfileIds: _.map(profiles, "id"),
                error: '',

            };

        case 'FETCH_PROFILES_FAILURE':
            return {
                loading: false,
                profiles: {},
                error: action.payload,
            };

        case 'CHANGE_PROFILE_CATEGORY_STATUS':

            const {id, name} = action.payload;
            const activeProfile = state.profiles[id];
            //const categories= activeProfile.categories;
            //const activeCategories = categories.map(category=>category.name!==name?categories.push(category):categories.splice(categories.indexOf(category), 1));

            return {
                ...state,
                profiles:{
                    ...state.profiles[id],
                    categories:_.reject(activeProfile.categories, category=> category.name===name)

                }
            };

        case 'FORBID_ALL_PC':
            return{
                ...state,
                profiles:{
                    ...state.profiles[action.payload],
                    categories: state.profiles[action.payload].categories.length=0,
                }
            }

        case 'APPROVE_ALL_PC':
            const {idAp,categoriesAp}=action.payload;
            debugger;
            return{
                ...state,
                profiles:{
                    ...state.profiles[idAp],
                    categories: _.map(categoriesAp, (category)=>({
                        ...category,
                        isSelected: true,
                    }))
                }
            }


        default:

            return state;
    }
};

export default profilesReducer;
