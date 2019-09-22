import * as actionTypes from './actionTypes';

export const purchaseBurgerSuccess = (id, order) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    payload: { id, order }
  };
};

export const purchaseBurgerFailed = error => {
  return { type: actionTypes.PURCHASE_BURGER_FAILED, error };
};

export const purchaseBurgerStart = () => {
  return { type: actionTypes.PURCHASE_BURGER_START };
};

export const purchaseBurger = (order, token) => {
  return { type: actionTypes.PURCHASE_BURGER, payload: { order, token } };
};

export const purchaseInit = () => {
  return { type: actionTypes.PURCHASE_INIT };
};

export const getOrdersStart = () => {
  return { type: actionTypes.GET_ORDERS_START };
};

export const getOrders = (token, userId) => {
  return { type: actionTypes.GET_ORDERS, payload: { token, userId } };
};

export const getOrdersSuccess = orders => {
  return { type: actionTypes.GET_ORDERS_SUCCESS, orders };
};

export const getOrdersFailed = error => {
  return { type: actionTypes.GET_ORDERS_FAILED, error };
};
