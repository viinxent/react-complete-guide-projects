import { put } from 'redux-saga/effects';

import axios from '../../axios-orders';

import * as actions from '../actions/index';

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());

  try {
    const { token, order } = action.payload;
    const response = yield axios.post('/orders.json?auth=' + token, order);
    yield put(actions.purchaseBurgerSuccess(response.data.name, order));
  } catch (error) {
    yield put(actions.purchaseBurgerFailed(error));
  }
}

export function* getOrdersSaga(action) {
  yield put(actions.getOrdersStart());

  try {
    const { token, userId } = action.payload;
    const query = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    const response = yield axios.get('/orders.json' + query);
    const orders = [];

    for (let key in response.data) {
      orders.push({
        ...response.data[key],
        id: key
      });
    }

    yield put(actions.getOrdersSuccess(orders));
  } catch (err) {
    yield put(actions.getOrdersFailed(err));
  }
}
