import * as _ from 'lodash';
import * as ActionTypes from '../constants/actionTypes/Expert';

// Initial State
const initialState = { data: [] };

const ExpertReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_EXPERT :
      return {
        data: [action.expert, ...state.data],
      };

    case ActionTypes.ADD_EXPERTS :
      return {
        data: action.experts,
      };

    case ActionTypes.DELETE_EXPERT :
      return {
        data: state.data.filter(expert => expert._id !== action.id),
      };

    case ActionTypes.UPDATE_EXPERT : {
      let data = _.map(state.data, (item) => {
        if (item._id !== action.expert._id) {
          return item;
        }
        return {
          ...item,
          ...action.expert
        };
      });
      return { data };
    }
    default:
      return state;
  }
};

// Selectors

// Get all experts
export const getExperts = state => _.get(state, 'expert.data', []);

// Get expert by ids
export const getProjectExperts = (state, ids) => {
  return _.filter(state.expert.data, expert => _.includes(ids, expert._id));
};

// Export Reducer
export default ExpertReducer;
