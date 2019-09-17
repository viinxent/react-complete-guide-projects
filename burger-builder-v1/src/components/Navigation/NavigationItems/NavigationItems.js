import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import './NavigationItems.css';

const NavigationItems = props => (
  <ul className="NavigationItems">
    <NavigationItem exact link="/">
      Burger Builder
    </NavigationItem>
    {props.isAuthenticated && <NavigationItem link="/orders">Orders</NavigationItem>}
    {props.isAuthenticated ? (
      <NavigationItem link="/logout">Logout</NavigationItem>
    ) : (
      <NavigationItem link="/auth">Authenticate</NavigationItem>
    )}
  </ul>
);

export default NavigationItems;
