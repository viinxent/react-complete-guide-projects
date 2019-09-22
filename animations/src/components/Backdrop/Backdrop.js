import React from 'react';

import './Backdrop.css';

const backdrop = props => {
  const classes = ['Backdrop'];

  if (props.show) {
    classes.push('BackdropOpen');
  } else {
    classes.push('BackdropClose');
  }

  return <div className={classes.join(' ')}></div>
};

export default backdrop;
