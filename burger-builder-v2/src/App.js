import React, { useEffect, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import * as actionCreators from './store/actions/index';

import Layout from './hoc/Layout/Layout';

const Auth = lazy(() => import('./containers/Auth/Auth'));
const BurgerBuilder = lazy(() =>
  import('./containers/BurgerBuilder/BurgerBuilder')
);
const Checkout = lazy(() => import('./containers/Checkout/Checkout'));
const Logout = lazy(() => import('./containers/Auth/Logout/Logout'));
const Orders = lazy(() => import('./containers/Orders/Orders'));

const App = (props) => {
  const { onAutoSignUp } = props;

  useEffect(() => {
    onAutoSignUp();
  }, [onAutoSignUp]);

  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/logout" component={Logout} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Layout>{routes}</Layout>
      </Suspense>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: Boolean(state.auth.token)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignUp: () => dispatch(actionCreators.checkAuthState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
