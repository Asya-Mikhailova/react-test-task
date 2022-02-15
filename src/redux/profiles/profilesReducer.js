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
            const {name, description, id} = action.payload;
            const activeProfile = state.profiles[id];
            return {
                ...state,
                profiles: {
                    ...state.profiles, //profile1, profile2
                    [id]: {
                        ...state.profiles[id],
                        categories:
                            !activeProfile.categories ? [] :
                                _.some(activeProfile.categories, category => category.name === name) === false
                                    ? [...activeProfile.categories, {name, description}]
                                    : _.reject(activeProfile.categories, category => category.name === name)
                    }
                }
            }

        case 'FORBID_ALL_PC':
            return {
                ...state,
                profiles: {
                    ...state.profiles,
                    [action.payload]: {
                        ...state.profiles[action.payload],
                        categories: state.profiles[action.payload].categories = [],
                    }
                }
            }

        case 'APPROVE_ALL_PC':
            const {idAp, categoriesAp} = action.payload;
            return {
                ...state,
                profiles: {
                    ...state.profiles,
                    [idAp]: {
                        ...state.profiles[idAp],
                        categories: _.map(categoriesAp, (category) => ({
                            ...category,
                            isSelected: true,
                        }))
                    }
                }
            }

            default:
            return state;
    }
};

export default profilesReducer;
