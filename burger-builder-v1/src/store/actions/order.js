import * as actionTypes from './actionTypes';

import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, order) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    payload: { id, order }
  };
};

export const purchaseBurgerFailed = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const purchaseBurger = (order, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());

    axios
      .post('/orders.json?auth=' + token, order)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, order));
      })
      .catch(error => {
        dispatch(purchaseBurgerFailed(error));
      });
  };
};

export const purchaseInit = () => {
  return { type: actionTypes.PURCHASE_INIT };
};

export const getOrdersStart = () => {
  return { type: actionTypes.GET_ORDERS_START };
};

export const getOrders = (token, userId) => {
  return dispatch => {
    dispatch(getOrdersStart());

    const query = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';

    axios
      .get('/orders.json' + query)
      .then(response => {
        const orders = [];

        for (let key in response.data) {
          orders.push({
            ...response.data[key],
            id: key
          });
        }

        dispatch(getOrdersSuccess(orders));
      })
      .catch(error => {
        dispatch(getOrdersFailed(error));
      });
  };
};

export const getOrdersSuccess = orders => {
  return { type: actionTypes.GET_ORDERS_SUCCESS, orders };
};

export const getOrdersFailed = error => {
  return { type: actionTypes.GET_ORDERS_FAILED, error };
};
