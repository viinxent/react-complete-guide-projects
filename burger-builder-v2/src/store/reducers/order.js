import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../utils/utility';

const initialState = {
  orders: [],
  loading: false,
  error: null,
  purchased: false
};

const purchaseInit = state => {
  return updateObject(state, { purchased: false });
};

const purchaseBurgerState = state => {
  return updateObject(state, { loading: true, error: null });
};

const purchaseBurgerSuccess = (state, action) => {
  const order = updateObject(action.payload.order, {
    id: action.payload.id
  });

  return updateObject(state, {
    loading: false,
    orders: state.orders.concat(order),
    purchased: true
  });
};

const purchaseBurgerFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
};

const getOrdersStart = (state) => {
  return updateObject(state, {
    loading: true
  });
};

const getOrdersSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.orders,
    loading: false,
    error: null
  });
};

const getOrdersFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);

    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerState(state, action);

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);

    case actionTypes.PURCHASE_BURGER_FAILED:
      return purchaseBurgerFailed(state, action);

    case actionTypes.GET_ORDERS_START:
      return getOrdersStart(state, action);

    case actionTypes.GET_ORDERS_SUCCESS:
      return getOrdersSuccess(state, action);

    case actionTypes.GET_ORDERS_FAILED:
      return getOrdersFailed(state, action);

    default:
      return state;
  }
};

export default orderReducer;
