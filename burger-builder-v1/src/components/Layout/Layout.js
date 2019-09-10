import React from 'react';

import Aux from '../../hoc/Auxiliary';

import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';

import './Layout.css';

const Layout = (props) => (
  <Aux>
    <Toolbar />
    <SideDrawer />
    <main className='Content'>
      {props.children}
    </main>
  </Aux>
);

export default Layout;