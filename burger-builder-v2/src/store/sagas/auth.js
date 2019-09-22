import { put, delay } from 'redux-saga/effects';

import axios from 'axios';

import * as actions from '../actions/index';

export function* logoutSaga() {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expiration');
  yield localStorage.removeItem('userId');

  yield put(actions.logoutSucceed());
}

export function* authCheckTimeout(action) {
  yield delay(action.expirationTime);
  yield put(actions.logout);
}

export function* authCheckStateSaga() {
  const token = yield localStorage.getItem('token');
  const userId = yield localStorage.getItem('userId');
  const expirationDate = new Date(localStorage.getItem('expiration'));

  if (!token || expirationDate < new Date() || !userId) {
    yield put(actions.logout());
  } else {
    yield put(actions.authSuccess(token, userId));
    yield put(actions.checkAuthTimeout(expirationDate.getTime() - new Date().getTime()));
  }
}

export function* authUserSaga(action) {
  try {
    yield put(actions.authStart());

    const { email, password, isSignUp } = action.payload;

    const auth = {
      email,
      password,
      returnSecureToken: true
    };

    const key = 'AIzaSyBQ9Jh2tilAsKBqDRThUNlwqX2Z3uq4c6g';
    let method = 'signUp';

    if (!isSignUp) {
      method = 'signInWithPassword';
    }

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${method}?key=${key}`;
    const response = yield axios.post(url, auth);
    const { idToken, localId, expiresIn } = response.data;
    const expirationDate = yield new Date(
      new Date().getTime() + expiresIn * 1000
    );

    yield localStorage.setItem('token', idToken);
    yield localStorage.setItem('expiration', expirationDate);
    yield localStorage.setItem('userId', localId);

    yield put(actions.authSuccess(idToken, localId));
    yield put(actions.checkAuthTimeout(expiresIn * 1000));
  } catch (error) {
    console.log(error);
    yield put(actions.authFail(error.response.data.error));
  }
}
