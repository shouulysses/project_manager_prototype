import { ADD_HISTORIES } from '../actions/HistoryActions';
import * as _ from 'lodash';

const initialState = { date: [] };

const HistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_HISTORIES :
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