import { all, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';

import * as authSaga from './auth';
import * as burgerBuilderSaga from './burgerBuilder';
import * as orderSaga from './order';

export function* watchAuth() {
  yield all([
    takeLatest(actionTypes.AUTH_INIT_LOGOUT, authSaga.logoutSaga),
    takeLatest(actionTypes.AUTH_CHECK_TIMEOUT, authSaga.authCheckTimeout),
    takeLatest(actionTypes.AUTH_USER, authSaga.authUserSaga),
    takeLatest(actionTypes.AUTH_CHECK_INIT, authSaga.authCheckStateSaga)
  ]);
}

export function* watchBurgerBuilder() {
  yield takeLatest(
    actionTypes.GET_INGREDIENTS,
    burgerBuilderSaga.getIngredientSaga
  );
}

export function* watchOrder() {
  yield takeLatest(actionTypes.PURCHASE_BURGER, orderSaga.purchaseBurgerSaga);
  yield takeLatest(actionTypes.GET_ORDERS, orderSaga.getOrdersSaga);
}
