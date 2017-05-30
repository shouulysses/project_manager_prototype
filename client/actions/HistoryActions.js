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

export function loadMore(histories) {
  return {
    type: ActionTypes.LOAD_MORE,
    histories
  };
}

export function fetchHistories(limit, skip) {
  return (dispatch) => {
    return callApi('histories', 'post', { limit, skip }).then((res) => {
      let histories = _.map(res.histories, (history) => {
        return {
          project_title: _.find(res.projects, ['_id', history.projectId]).title,
          expert_name: _.find(res.experts, ['_id', history.expertId]).name,
          user: history.userId,
          result: history.result,
          dateAdded: history.dateAdded
        };
      });
      if (skip === 0) {
        dispatch(addHistories(histories));
      } else {
        dispatch(loadMore(histories));
      }
    });
  };
}
