import React, { Component } from 'react';

import axios from '../../axios-orders';

import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

import Order from '../../components/Order/Order';

class Orders extends Component {
  state = {
    orders: []
  };

  componentDidMount() {
    axios
      .get('/orders.json')
      .then(response => {
        const fetchedOrders = [];

        for (let key in response.data) {
          fetchedOrders.push({
            ...response.data[key],
            id: key,
          });
        }

        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch(_ => {
        this.setState({ loading: false, orders: [] });
      });
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => (
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

export default withErrorHandler(Orders, axios);
