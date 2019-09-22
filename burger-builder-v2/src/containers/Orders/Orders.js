import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';

import * as actionCreators from '../../store/actions/index';

import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  componentDidMount() {
    this.props.getOrders(this.props.token, this.props.userId);
  }

  render() {
    if (this.props.loading) {
      return <Spinner />
    }

    return (
      <div>
        {this.props.orders.map(order => (
          <Order
            price={order.price}
            ingredients={order.ingredients}
            key={order.id}
          />
        ))}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrders: (token, userId) => dispatch(actionCreators.getOrders(token, userId))
  };
};

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    token: state.auth.token,
    loading: state.order.loading,
    orders: state.order.orders
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
