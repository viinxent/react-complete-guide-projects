import React from 'react';

import Aux from '../../../hoc/Auxiliary/Auxiliary';

import Backdrop from '../../UI/Backdrop/Backdrop';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import './SideDrawer.css';

const SideDrawer = (props) => {
  let attachedClasses = ['SideDrawer', 'Close'];

  if (props.open) {
    attachedClasses = ['SideDrawer', 'Open']
  }

  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')}>
        <div className="LogoContainer">
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
}

export default SideDrawer;