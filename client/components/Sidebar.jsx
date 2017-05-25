import React from 'react';
import { Link } from 'react-router';
import { Icon } from 'semantic-ui-react';
import classNames from 'classnames';

const Sidebar = ({ route }) => (
  <div className="sidebar-container">
    <div className="sidebar-menu">
      <ul>
        <li className={classNames({ active: route.includes('dashboard') })}>
          <Link to="/dashboard">
            <div>Dashboard</div>
            <div className="icon-area"><Icon name="home" /></div>
          </Link>
        </li>
        <li className={classNames({ active: route.includes('history') })}>
          <Link to="/history">
            <div>History</div>
            <div className="icon-area"><Icon name="history" /></div>
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Sidebar;
