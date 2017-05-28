import callApi from '../util/apiCaller';
import { addProjects } from './ProjectActions';
import { addExperts } from './ExpertActions';
import * as _ from 'lodash';

// Export Constants
export const ADD_HISTORIES = 'ADD_HISTORIES';

// Export Actions
export function addHistories(histories) {
  return {
    type: ADD_HISTORIES,
    histories
  };
}

export function fetchHistories(limit) {
  console.log('fetch',  limit)
  return (dispatch) => {
    return callApi('histories').then(res => {
      console.log('p', res.projects)
      let histories = _.map(res.histories, history => {
        console.log('h', history)
        return {
          project_title: _.find(res.projects, ['_id', history.projectId]).title,
          expert_name: _.find(res.experts, ['_id', history.expertId ]).name,
          user: history.userId,
          result: history.result,
          dateAdded: history.dateAdded
        };
      });
      console.log('fetched', histories)
      dispatch(addHistories(histories));
    });
  };
}