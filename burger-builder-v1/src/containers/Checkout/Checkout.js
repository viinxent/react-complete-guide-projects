import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    const { ingredients } = this.props;

    return (
      <div>
        <CheckoutSummary
          checkoutCanceled={this.checkoutCanceledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
          ingredients={ingredients}
        />
        <Route
          path={this.props.match.path + '/contact-data'}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ingredients: state.ingredients };
};

export default connect(mapStateToProps)(Checkout);
