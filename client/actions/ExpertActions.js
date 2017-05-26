import callApi from '../util/apiCaller';

// Export Constants
export const ADD_EXPERT = 'ADD_EXPERT';
export const ADD_EXPERTS = 'ADD_EXPERTS';
export const DELETE_EXPERT = 'DELETE_EXPERT';
export const UPDATE_EXPERT = 'UPDATE_EXPERT;'

// Export Actions
export function addExpert(expert) {
  return {
    type: ADD_EXPERT,
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
    type: ADD_EXPERTS,
    experts,
  };
}

export function updateExpert(expert) {
  return {
    type: UPDATE_EXPERT,
    expert    
  }
}

export function fetchExperts() {
  return (dispatch) => {
    return callApi('experts').then(res => {
      dispatch(addExperts(res.experts));
    });
  };
}

export function fetchExpertInProject(id) {
  console.log('action', id);
  return (dispatch) => {
    return callApi(`expert/project`).then(res => {
      dispatch(addExpert(res.expert));
    });
  };
}

export function deleteExpert(id) {
  return {
    type: DELETE_EXPERT,
    id
  };
}

export function deleteExpertRequest(id) {
  return (dispatch) => {
    return callApi(`deleteExpert/${id}`, 'post')
    .then(() => dispatch(deleteExpert(id)));
  };
}

export function changeExpertStatus(data) {
  return (dispatch) => {
    return callApi('/expertStatus', 'post', data)
    .then(res => dispatch(updateExpert(res.expert)));
  };
}