import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'semantic-ui-react';
import * as _ from 'lodash';
import moment from 'moment';

// Import Actions
import { fetchHistories, loadMore } from '../../actions/HistoryActions';

// Import Selectors
import { getHistories } from '../../reducers/HistoryReducer';


class HistoryListingPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      histories: this.props.histories,
      limit: 20,
      skip: 10
    };
  }
  
  componentDidMount() {
    this.props.dispatch(fetchHistories(10, 0));
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
  
  loadMore = (limit, skip) => {
    this.props.dispatch(fetchHistories(limit, skip));
    this.setState({
      limit: this.state.limit + 10,
      skip: this.state.skip + 10
    });
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
    return (
      <div className="history-listing col-10 center pt2 ">
        <h2>History</h2>
        <div className="overflow-wrapper">
          <Table className="ui celled table unstackable">
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
                <td>{moment(_.get(history, 'dateAdded')).format("MMM Do YYYY hh:mm:ss") || 'N/A'}</td>
                </tr>
              )}
            </tbody>
          </Table>
          <Button 
            className={`ui button`}
            onClick={() => this.loadMore(this.state.limit, this.state.skip)}
          >
          Load More
          </Button>
        </div>
      </div>
    );
  }
}

HistoryListingPage.need = [params => {
  return fetchHistories(10, 0);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    histories: getHistories(state),
  };
}

HistoryListingPage.propTypes = {
  histories: PropTypes.shape({
    project_title: PropTypes.string.isRequired,
    expert_name: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    result: PropTypes.string.isRequired,
    dateAdded: PropTypes.string.isRequired
  }).isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(HistoryListingPage);