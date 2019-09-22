import * as actionTypes from './actionTypes';

export const authStart = () => {
  return { type: actionTypes.AUTH_START };
};

export const auth = (email, password, isSignUp) => {
  return {
    type: actionTypes.AUTH_USER,
    payload: { email, password, isSignUp }
  };
};

export const authSuccess = (token, userId) => {
  return { type: actionTypes.AUTH_SUCCESS, payload: { token, userId } };
};

export const authFail = error => {
  return { type: actionTypes.AUTH_FAILED, error };
};

export const checkAuthTimeout = expirationTime => {
  return { type: actionTypes.AUTH_CHECK_TIMEOUT, expirationTime };
};

export const logout = () => {
  return { type: actionTypes.AUTH_INIT_LOGOUT };
};

export const logoutSucceed = () => {
  return { type: actionTypes.AUTH_LOGOUT };
};

export const setAuthRedirect = path => {
  return { type: actionTypes.SET_AUTH_REDIRECT, path };
};

export const checkAuthState = () => {
  return { type: actionTypes.AUTH_CHECK_INIT };
};
