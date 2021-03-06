import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import moment from 'moment';

// Import Components
import ProjectTable from '../../components/Project/ProjectTable';
import AddProjectComponent from '../../components/Project/AddProjectComponent';

// Import Actions
import { addProjectRequest, fetchProjects, deleteProjectRequest } from '../../actions/ProjectActions';

// Import Selectors
import { getProjects } from '../../reducers/ProjectReducer';
import { isAuthenticated } from '../../reducers/AuthReducer';

class ProjectListContainer extends Component {
  constructor(props){
    super(props);
  }
  
  componentDidMount() {
    this.props.dispatch(fetchProjects());
  }
  
  componentDidUpdate(prevProps){
    if(!this.props.isAuthenticated)
      this.context.router.push('/');
  }

  // Add new project  
  handleAddProject = (title, startDate) => {
    this.props.dispatch(addProjectRequest({ title, startDate }));
  };
  
  // Delete exisitng project
  handleDeleteProject = id => {
    if (confirm('Do you want to delete this project')) { // eslint-disable-line
      this.props.dispatch(deleteProjectRequest(id));
    }
  };



  render() {
    const {
      projects
    } = this.props;
    
    return (
      <div className="col-12 col-lg-10 center">
        <h1 className="text-align-left pt2 mb3">Project List</h1>
        <h2> New Projects </h2>
        <ProjectTable handleDeleteProject={this.handleDeleteProject} projects={ _.filter(projects, project => moment(project.startDate) >= moment() && project.status === 'new' && project.experts.length === 0) } />
        <h2> Pending Projects </h2>
        <ProjectTable handleDeleteProject={this.handleDeleteProject} projects={ _.filter(projects, project => moment(project.startDate) >= moment() && project.experts.length > 0) } />
        <h2> Expired Projects </h2>
        <ProjectTable handleDeleteProject={this.handleDeleteProject} projects={ _.filter(projects, project => moment(project.startDate) < moment()) } />
        <h2> Add a project </h2>
        <AddProjectComponent addProject={this.handleAddProject} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in server side.
ProjectListContainer.need = [() => { return fetchProjects(); }];

// Retrieve data from state as props
function mapStateToProps(state) {
  return {
    projects: getProjects(state),
    isAuthenticated: isAuthenticated(state)
  };
}

ProjectListContainer.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    dateAdded: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

ProjectListContainer.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(ProjectListContainer);
