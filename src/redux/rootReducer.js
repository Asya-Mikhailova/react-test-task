import { combineReducers } from 'redux';
import categoriesReducer from './categories/categoriesReducer';
import profilesReducer from './profiles/profilesReducer';

const rootReducer = combineReducers({
  categories: categoriesReducer,
  profiles: profilesReducer,
});

export default rootReducer;
