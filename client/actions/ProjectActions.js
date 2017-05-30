import callApi from '../util/apiCaller';
import * as ActionTypes from '../constants/actionTypes/Project';
import { addExperts } from './ExpertActions';

// Export Constants


// Export Actions
export function addProject(project) {
  return {
    type: ActionTypes.ADD_PROJECT,
    project,
  };
}

export function addProjectRequest(project) {
  return (dispatch) => {
    return callApi('addProject', 'post', {
      project: {
        title: project.title,
        startDate: project.startDate,
      },
    })
    .then(
      res => dispatch(addProject(res.project))
    );
  };
}

export function addProjects(projects) {
  return {
    type: ActionTypes.ADD_PROJECTS,
    projects,
  };
}

export function fetchProjects() {
  return (dispatch) => {
    return callApi('projects').then((res) => {
      dispatch(addProjects(res.projects));
    });
  };
}

export function fetchProject(id) {
  return (dispatch) => {
    return callApi(`project/${id}`).then((res) => {
      dispatch(addProject(res.project));
      dispatch(addExperts(res.experts));
    });
  };
}

export function deleteProject(id) {
  return {
    type: ActionTypes.DELETE_PROJECT,
    id
  };
}

export function deleteProjectRequest(id) {
  return (dispatch) => {
    return callApi(`deleteProject/${id}`, 'post')
    .then(() => dispatch(deleteProject(id)));
  };
}
