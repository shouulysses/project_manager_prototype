import React from 'react';
import { connect } from 'react-redux';
import { currentUser } from '../reducers/AuthReducer';

const Topbar = ({ user }) => (
  <div className="topbar-container">
    <div className="topbar-name">
      { user }
    </div>
  </div>
);

function mapStateToProps(state) {
  return {
    user: currentUser(state)
  };
}

export default connect(mapStateToProps)(Topbar);
