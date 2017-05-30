import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App } from './components/App/App';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
  require('./containers/Project/ProjectListContainer');
  require('./containers/Auth/LoginContainer');
  require('./containers/Auth/SignupContainer');
  require('./pages/Project/ProjectDetailPage');
  require('./pages/History/HistoryListingPage');
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route path="/" component={App}>
    <IndexRoute
      getComponent={(nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./containers/Auth/LoginContainer').default);
        });
      }}
    />
    <Route
      path="/signup"
      getComponent={(nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./containers/Auth/SignupContainer').default);
        });
      }}
    />
    <Route
      path="/projects"
      getComponent={(nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./containers/Project/ProjectListContainer').default);
        });
      }}
    />
    <Route
      path="/project/:id"
      getComponent={(nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./pages/Project/ProjectDetailPage').default);
        });
      }}
    />
    <Route
      path="/history"
      getComponent={(nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./pages/History/HistoryListingPage').default);
        });
      }}
    />

  </Route>
);
