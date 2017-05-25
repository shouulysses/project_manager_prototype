import React from 'react';
import _get from 'lodash';

const Sidebar = ({ currentUser }) => (
  <div className="topbar-container">
    <div className="topbar-name">
      {currentUser}
    </div>
  </div>
);

export default Sidebar;
