import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

// Import Components
import Helmet from 'react-helmet';
import DevTools from '../../containers/DevTools';
import Sidebar from '../Sidebar';
import Topbar from '../Topbar';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
  }

  render() {
    
    console.log('u', this.props.currentUser)
    
    return (
      <div>
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
        <div>
          <Helmet
            title="Lynk Project Manager"
            titleTemplate="%s - Blog App"
            link={[{ 
              rel: "stylesheet",
              href: "//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css" 
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
          <div className= {`container ${this.props.isAuthenticated && 'container-auth'}`}>
          {this.props.isAuthenticated && [
            <Sidebar route={this.props.location.pathname} />,
            <Topbar currentUser={this.props.currentUser} />
          ]}
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
    isAuthenticated: store.auth.isAuthenticated,
    currentUser: _.get(store, 'auth.user.email', '')
  };
}

export default connect(mapStateToProps)(App);
