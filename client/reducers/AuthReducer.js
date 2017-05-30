import * as _ from 'lodash';
import * as ActionTypes from '../constants/actionTypes/Auth';

const initialState = {
  isAuthenticated: false,
  isFetching: false,
  loaded: false,
  message: ''
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_CHECK_TOKEN:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        isFetching: action.isFetching,
        loaded: false,
      };
    case ActionTypes.TOKEN_VALID:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        isFetching: action.isFetching,
        loaded: true,
      };
    case ActionTypes.TOKEN_INVALID:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        isFetching: action.isFetching,
        loaded: true,
      };
    case ActionTypes.REQUEST_LOGIN:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        isFetching: action.isFetching,
        user: action.creds,
        message: '',
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isFetching: false,
        message: '',
      };
    case ActionTypes.LOGIN_FALIURE:
      return {
        ...state,
        isAuthenticated: false,
        isFetching: false,
        message: action.message,
      };
    default:
      return state;
  }
};

// Selectors

// Get all current user (email)
export const currentUser = state => {
  console.log('a')
  return _.get(state, 'auth.user.email', 'non-user');
}
export const isAuthenticated = state => _.get(state, 'auth.isAuthenticated', false);

export default authReducer;
