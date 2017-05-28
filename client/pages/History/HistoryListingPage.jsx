import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'semantic-ui-react';
import * as _ from 'lodash';
import moment from 'moment';

// Import Actions
import { fetchHistories } from '../../actions/HistoryActions';

// Import Selectors
import { getProjects } from '../../reducers/ProjectReducer';
import { getExperts } from '../../reducers/ExpertReducer';
import { getHistories } from '../../reducers/HistoryReducer';


class HistoryListingPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      histories: this.props.histories
    }
  }
  
  componentDidMount() {
    this.props.dispatch(fetchHistories());
  }
  
  sortFunction = (field, order = false) => {
    let histories = order
    ? _.sortBy(this.state.histories, field)
    : _.sortBy(this.state.histories, field).reverse();
    this.setState({ histories });
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
  
  render(){
    const {
      projects,
      experts
    } = this.props;
    
    const {
      histories
    } = this.state;
    
    return (
      <div className="history-listing">
        <Table className="ui celled table">
          <thead>
            <tr>
              { this.renderHeader('Title', 'title') }
              { this.renderHeader('Start Date', 'startDate') }
              { this.renderHeader('Status', 'status') }
              { this.renderHeader('Date Added', 'dateAdded') }
            </tr>
          </thead>
        
        
        </Table>
      </div>
    );
  }
}

HistoryListingPage.need = [params => {
  return fetchHistories();
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    histories: getHistories(),
    projects: getProjects(),
    experts: getExperts()
  };
}

HistoryListingPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(HistoryListingPage);