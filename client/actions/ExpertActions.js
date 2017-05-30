import callApi from '../util/apiCaller';
import * as ActionTypes from '../constants/actionTypes/Expert';

// Export Actions
export function addExpert(expert) {
  return {
    type: ActionTypes.ADD_EXPERT,
    expert,
  };
}

export function addExpertRequest(expert) {
  return (dispatch) => {
    return callApi('addexpert', 'post', {
      expert: {
        name: expert.name,
        description: expert.description
      },
    }).then(res => dispatch(addExpert(res.expert)));
  };
}

export function addExperts(experts) {
  return {
    type: ActionTypes.ADD_EXPERTS,
    experts
  };
}

export function updateExpert(expert) {
  return {
    type: ActionTypes.UPDATE_EXPERT,
    expert
  };
}

export function fetchExperts() {
  return (dispatch) => {
    return callApi('experts').then((res) => {
      dispatch(addExperts(res.experts));
    });
  };
}

export function deleteExpert(id) {
  return {
    type: ActionTypes.DELETE_EXPERT,
    id
  };
}

export function deleteExpertRequest(id) {
  return (dispatch) => {
    return callApi(`deleteExpert/${id}`, 'post')
    .then(() => dispatch(deleteExpert(id)));
  };
}

export function changeExpertStatus(expertId, projectId, user, status) {
  return (dispatch) => {
    return callApi('expertStatus', 'post', {
      expertId,
      projectId,
      user,
      status
    })
    .then(res => dispatch(updateExpert(res.expert)));
  };
}
