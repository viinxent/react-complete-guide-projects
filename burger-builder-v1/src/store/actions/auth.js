import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
  return { type: actionTypes.AUTH_START };
};

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
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

    axios
      .post(url, auth)
      .then(response => {
        const { idToken, localId, expiresIn } = response.data;

        const expirationDate = new Date(
          new Date().getTime() + expiresIn * 1000
        );

        localStorage.setItem('token', idToken);
        localStorage.setItem('expiration', expirationDate);
        localStorage.setItem('userId', localId);

        dispatch(authSuccess(idToken, localId));
        dispatch(checkAuthTimeout(expiresIn * 1000));
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const authSuccess = (token, userId) => {
  return { type: actionTypes.AUTH_SUCCESS, payload: { token, userId } };
};

export const authFail = error => {
  return { type: actionTypes.AUTH_FAILED, error };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
  localStorage.removeItem('userId');

  return { type: actionTypes.AUTH_LOGOUT };
};

export const setAuthRedirect = path => {
  return { type: actionTypes.SET_AUTH_REDIRECT, path };
};

export const checkAuthState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const expirationDate = new Date(localStorage.getItem('expiration'));

    if (!token || expirationDate < new Date() || !userId) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(token, userId));
      dispatch(
        checkAuthTimeout(expirationDate.getTime() - new Date().getTime())
      );
    }
  };
};
