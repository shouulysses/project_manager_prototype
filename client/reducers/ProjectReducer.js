import { ADD_PROJECT, ADD_PROJECTS, DELETE_PROJECT } from '../actions/ProjectActions';
import * as _ from 'lodash';

// Initial State
const initialState = { data: [] };

const ProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROJECT :
      return {
        data: [action.project, ...state.data],
      };

    case ADD_PROJECTS :
      return {
        data: action.projects,
      };

    case DELETE_PROJECT :
      return {
        data: state.data.filter(project => project._id !== action.id),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all projects
export const getProjects = state => _.get(state, 'projects.data', []);

// Get project by id
export const getProject = (state, id) => state.projects.data.filter(project => project._id === id)[0];

// Export Reducer
export default ProjectReducer;
