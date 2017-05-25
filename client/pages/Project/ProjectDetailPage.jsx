import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'semantic-ui-react';
import Helmet from 'react-helmet';
import * as _ from 'lodash';
import moment from 'moment';

// Import Actions
import { fetchProject } from '../../actions/ProjectActions';

// Import Selectors
import { getProject } from '../../reducers/ProjectReducer';

class ProjectDetailPage extends Component {
  constructor(props){
    super(props);
  }
  
  componentDidMount() {
    this.props.dispatch(fetchProject(_.get(this.props, 'parms.id')));
  }
  
  render(){
    const {
      project
    } = this.props;

    return (
      <div>
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
              </tr>
            </thead>
            <tbody>
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
ProjectDetailPage.need = [params => {
  return fetchProject(_.get(params, 'id'));
}];

// Retrieve data from store as props
function mapStateToProps(store, props) {
  return {
    project: getProject(store, _.get(props, 'params.id')),
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
};

export default connect(mapStateToProps)(ProjectDetailPage);
