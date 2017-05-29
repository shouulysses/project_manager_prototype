import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'semantic-ui-react';
import * as _ from 'lodash';
import moment from 'moment';

// Import Actions
import { fetchHistories } from '../../actions/HistoryActions';

// Import Selectors
import { getHistories } from '../../reducers/HistoryReducer';


class HistoryListingPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      histories: this.props.histories
    };
  }
  
  componentDidMount() {
    this.props.dispatch(fetchHistories());
  }
  
  componentWillReceiveProps(nextProps){
    if(this.props.histories !== nextProps.histories)
      this.setState({ histories: nextProps.histories});
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
    console.log('state', this.state.histories)
    console.log('props', this.props.histories)
    
    return (
      <div className="history-listing col-10 center pt2">
        <Table className="ui celled table">
          <thead>
            <tr>
              { this.renderHeader('Project Title', 'project_title') }
              { this.renderHeader('Expert Name', 'expert_name') }
              { this.renderHeader('User', 'user') }
              { this.renderHeader('result', 'result') }
              { this.renderHeader('Date Added', 'dateAdded') }
            </tr>
          </thead>
          <tbody>
          {_.map( this.state.histories, (history, index) =>
            <tr key={`${_.get(history, '_id')}-${index}`}>
              <td>{ _.get(history, 'project_title') }</td>
              <td>{ _.get(history, 'expert_name') }</td>
              <td>{ _.get(history, 'user') }</td>
              <td className="capitalize">{ _.get(history,'result') } </td>
              <td>{moment(_.get(history, 'dateAdded')).format("MMM Do YYYY") || 'N/A'}</td>
              </tr>
            )}
          </tbody>
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
    histories: getHistories(state),
  };
}

HistoryListingPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(HistoryListingPage);