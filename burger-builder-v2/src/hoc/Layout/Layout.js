import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';

import Aux from '../Auxiliary/Auxiliary';

import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

import './Layout.css';

const Layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = useCallback(() => {
    setShowSideDrawer(false);
  }, []);

  const sideDrawerToggleHandler = useCallback(() => {
    setShowSideDrawer(!showSideDrawer);
  }, [showSideDrawer]);

  return (
    <Aux>
      <Toolbar
        isAuthenticated={props.isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandler}
      />
      <SideDrawer
        open={showSideDrawer}
        closed={sideDrawerClosedHandler}
        isAuthenticated={props.isAuthenticated}
      />
      <main className="Content">{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: Boolean(state.auth.token)
  };
};

export default connect(mapStateToProps)(Layout);
