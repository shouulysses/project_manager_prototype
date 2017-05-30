import * as _ from 'lodash';
import * as ActionTypes from '../constants/actionTypes/History';

const initialState = { date: [] };

const HistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_HISTORIES :
      return {
        data: action.histories
      };
    default:
      return state;
  }
};

// Selectors

// Get all histories
export const getHistories = state => _.get(state, 'history.data', []);

// Export Reducer
export default HistoryReducer;
