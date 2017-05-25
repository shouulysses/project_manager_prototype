import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Table, Button } from 'semantic-ui-react';
import * as _ from 'lodash';
import moment from 'moment';

class ProjectTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      projects: this.props.projects
    };
  }
  
  // Confirm state is updated
  componentWillUpdate(nextProps){
    if(nextProps.projects !== this.state.projects)
      this.setState({ projects: nextProps.projects});
  }
  
  sortFunction = (field, order = false) => {
    let projects = order
    ? _.sortBy(this.state.projects, field)
    : _.sortBy(this.state.projects, field).reverse();
    this.setState({ projects });
  }
  
  renderHeader(title, field){
    return (
      <th width = '200px'>
        {title}
        <span className="arrow-up" onClick={()=>this.sortFunction(field, true)} ></span>
        <span className="arrow-down" onClick={()=>this.sortFunction(field, false)}></span>
      </th>
    );
  }
  
  render() {
    console.log(this.state.projects)
    
    return (
      <Table className="project-table ui sortable celled table">
        <thead>
          <tr>
            { this.renderHeader('Title', 'title') }
            { this.renderHeader('Start Date', 'startDate') }
            { this.renderHeader('Status', 'status') }
            { this.renderHeader('Date Added', 'dateAdded') }
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        {_.map(this.state.projects, (project) => 
          <tr>
            <td>{_.get(project, 'title', 'N/A')}</td>
            <td width='160px'>{moment(_.get(project, 'startDate')).format("MMM Do YYYY") || 'N/A'}</td>
            <td width='160px'>{_.get(project, 'status', 'N/A')}</td>
            <td width='160px'>{moment(_.get(project, 'dateAdded')).format("MMM Do YYYY") || 'N/A'}</td>
            <td width='160px'><Button onClick={ ()=>{ this.props.handleDeleteProject(_.get(project, '_id')) } }>Delete</Button></td>
          </tr>
        )}
        </tbody>
      </Table>
    );
  }
}


ProjectTable.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    dateAdded: PropTypes.string.isRequired,
  })),
  handleDeleteProject: PropTypes.func.isRequired
};

export default ProjectTable;
