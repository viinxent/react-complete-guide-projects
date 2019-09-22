import React, { useContext } from 'react';

import { AuthContext } from '../context/AuthContext';

import Card from './UI/Card';
import './Auth.css';

const Auth = props => {
  const authContext = useContext(AuthContext);

  return (
    <div className="auth">
      <Card>
        <h2>You are not authenticated!</h2>
        <p>Please log in to continue.</p>
        <button onClick={authContext.login}>Log In</button>
      </Card>
    </div>
  );
};

export default Auth;
