import * as _ from 'lodash';
import * as ActionTypes from '../constants/actionTypes/History';
import callApi from '../util/apiCaller';

// Export Actions
export function addHistories(histories) {
  return {
    type: ActionTypes.ADD_HISTORIES,
    histories
  };
}

export function fetchHistories() {
  return (dispatch) => {
    return callApi('histories').then((res) => {
      let histories = _.map(res.histories, (history) => {
        return {
          project_title: _.find(res.projects, ['_id', history.projectId]).title,
          expert_name: _.find(res.experts, ['_id', history.expertId]).name,
          user: history.userId,
          result: history.result,
          dateAdded: history.dateAdded
        };
      });
      dispatch(addHistories(histories));
    });
  };
}
