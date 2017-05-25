/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './reducers/AppReducer';
import projects from './reducers/ProjectReducer';
import intl from './reducers/IntlReducer';
import auth from './reducers/AuthReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  projects,
  intl,
  auth
});
