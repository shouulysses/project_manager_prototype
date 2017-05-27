import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'semantic-ui-react';
import Helmet from 'react-helmet';
import * as _ from 'lodash';
import moment from 'moment';

// Import Actions
import { fetchProject } from '../../actions/ProjectActions';
import { changeExpertStatus } from '../../actions/ExpertActions';

// Import Selectors
import { getProject } from '../../reducers/ProjectReducer';
import { getProjectExperts } from '../../reducers/ExpertReducer';
import { currentUser } from '../../reducers/AuthReducer';

class ProjectDetailPage extends Component {
  constructor(props){
    super(props);
  }
  
  componentDidMount() {
    this.props.dispatch(fetchProject(_.get(this.props, 'params.id')));
  }
  
  getCurrentStatus = (index) => {
    // getting the status of each experts
    let expertStatus = _.map(_.flatten(_.map(_.get(this.props, 'experts'), 'projects')), expert => {
      if(expert._id === _.get(this.props.project, '_id'))
        return _.get(expert, 'status');
    });
    return _.get(expertStatus, index);
  }
  
  changeExpertStatus = (index, id, currentStatus, expectedStatus) =>{
    if(currentStatus === expectedStatus)
      return;
    this.props.dispatch(changeExpertStatus(id, _.get(this.props, 'project._id'), this.props.currentUser, expectedStatus));
  }
  
  render(){
    const {
      project,
      experts,
    } = this.props;
    
    return (
      <div className="col-10 center">
        <Helmet title={ _.get(project, 'title') } />
        <div className="project-detail">
          <h2>{ _.get(project, 'title') } ({ _.get(project, 'status') })</h2>
          <div className="row">
            <div className="col-6 col-lg-3">Start Date:</div>
            <div className="col-6 col-lg-3">{ moment(_.get(project, 'startDate')).format("MMM Do YYYY") || 'N/A' }</div>
            <div className="col-6 col-lg-3">Data Added:</div>
            <div className="col-6 col-lg-3">{ moment(_.get(project, 'dateAdded')).format("MMM Do YYYY") || 'N/A' }</div>
          </div>
          <Table className="project-detail-table table ui celled">
            <thead>
              <tr>
                <th> Expert </th>
                <th width="250px"> Description </th>
                <th width="250px"> Status </th>
                <th width="250px"> Approve/ Reject </th>
              </tr>
            </thead>
            <tbody>
            {_.map( experts, (expert, index) => 
              <tr key={`${_.get(expert, '_id')}-${index}`}>
                <td>{ _.get(expert, 'name') }</td>
                <td>{ _.get(expert, 'description') }</td>
                <td className="capitalize">{ this.getCurrentStatus(index) } </td>
                <td>
                <div className="ui large buttons">
                  <Button 
                    className={`ui button ${ this.getCurrentStatus(index) === 'approve' && 'active'}`}
                    onClick={() => this.changeExpertStatus(index, _.get(expert, '_id'), this.getCurrentStatus(index), 'approve')}
                  >
                  Approve
                  </Button>
                  <div className="or"></div>
                  <Button 
                    className={`ui button ${ this.getCurrentStatus(index) === 'reject' && 'active'}`}
                    onClick={() => this.changeExpertStatus(index, _.get(expert, '_id'), this.getCurrentStatus(index), 'reject')}
                  >
                  Reject
                  </Button>
                </div>
                
                </td>
              </tr>
            )}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in server side.
ProjectDetailPage.need = [params => {
  return fetchProject(_.get(params, 'id'));
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  let currentProject = getProject(state, _.get(props, 'params.id'));
  return {
    project: currentProject,
    experts: getProjectExperts(state, currentProject.experts),
    currentUser: currentUser(state)
  };
}

ProjectDetailPage.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    dateAdded: PropTypes.string.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  currentUser: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(ProjectDetailPage);
