import callApi from '../util/apiCaller';

// Export Constants
export const ADD_PROJECT = 'ADD_PROJECT';
export const ADD_PROJECTS = 'ADD_PROJECTS';
export const DELETE_PROJECT = 'DELETE_PROJECT';

// Export Actions
export function addProject(project) {
  return {
    type: ADD_PROJECT,
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
    }).then(res => dispatch(addProject(res.project)));
  };
}

export function addProjects(projects) {
  return {
    type: ADD_PROJECTS,
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
    return callApi(`projects/${id}`).then(res => dispatch(addProject(res.project)));
  };
}

export function deleteProject(id) {
  return {
    type: DELETE_PROJECT,
    id
  };
}

export function deleteProjectRequest(id) {
  return (dispatch) => {
    return callApi(`deleteProject/${id}`, 'post')
    .then(() => dispatch(deleteProject(id)));
  };
}
