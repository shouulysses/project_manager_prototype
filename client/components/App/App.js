import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';


// Import Components
import Helmet from 'react-helmet';
import DevTools from '../../containers/DevTools';
import Sidebar from '../Sidebar';
import Topbar from '../Topbar';

// Import Selectors
import { isAuthenticated } from '../../reducers/AuthReducer';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({ isMounted: true }); // eslint-disable-line
  }

  render() {
    const {
      location
    } = this.props;
    
    const authBool = (location.pathname === '/' || location.pathname.includes('signup'));

    return (
      <div>
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
        <div>
          <Helmet
            title="Lynk Project Manager"
            titleTemplate="%s - Lynk Project Manager"
            link={[{
              rel: 'stylesheet',
              href: '//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css'
            }]}
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]}
          />
          <div className={`container ${!authBool && 'container-auth'}`}>
            {!authBool && [
              <Sidebar route={ location.pathname } />,
              <Topbar />
            ]}
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

// Retrieve data from state as props
function mapStateToProps(state) {
  return {
    intl: state.intl,
    isAuthenticated: isAuthenticated(state)
  };
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(App);
