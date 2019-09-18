import React from 'react';

import User from '../../components/User';

const indexPage = _ => {
  return (
    <div>
      <h1>The auth page</h1>
      <User name="Vincent Nocum" age="26" />
    </div>
  );
};

export default indexPage;
