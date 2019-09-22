import React, { useContext } from 'react';

import { AuthContext } from './context/AuthContext';

import Ingredients from './components/Ingredients/Ingredients';
import Auth from './components/Auth';

const App = props => {
  const authContext = useContext(AuthContext);

  if (authContext.isAuth) return <Ingredients />;

  return <Auth />;
};

export default App;
