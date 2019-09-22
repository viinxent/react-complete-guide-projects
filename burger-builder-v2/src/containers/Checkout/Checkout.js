import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions/index';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = props => {
  const { purchaseInit, purchased, ingredients } = props;

  useEffect(() => {
    purchaseInit();
  }, [purchaseInit]);

  const checkoutCanceledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data');
  };

  const redirect = <Redirect to="/" />;

  if (!ingredients) {
    return redirect;
  }

  if (purchased) {
    return redirect;
  }

  return (
    <div>
      <CheckoutSummary
        checkoutCanceled={checkoutCanceledHandler}
        checkoutContinued={checkoutContinuedHandler}
        ingredients={ingredients}
      />
      <Route
        path={props.match.path + '/contact-data'}
        component={ContactData}
      />
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    purchaseInit: () => dispatch(actionCreators.purchaseInit())
  };
};

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
