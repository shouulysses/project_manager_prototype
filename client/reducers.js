/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './reducers/AppReducer';
import project from './reducers/ProjectReducer';
import intl from './reducers/IntlReducer';
import auth from './reducers/AuthReducer';
import expert from './reducers/ExpertReducer';
import history from './reducers/HistoryReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  project,
  intl,
  auth,
  expert,
  history
});
