import React from 'react';

import './Layout.css';

import Aux from '../../hoc/Auxiliary';

const Layout = (props) => (
  <Aux>
    <div>
      Toolbar, SideDrawer, Backdrop
    </div>
    <main className='Content'>
      {props.children}
    </main>
  </Aux>
);

export default Layout;