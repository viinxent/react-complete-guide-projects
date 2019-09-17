import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../utils/utility';

const initialState = {
  token: '',
  userId: '',
  error: null,
  loading: false,
  redirect: '/'
};

const authStart = state => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.payload.token,
    userId: action.payload.userId,
    error: null,
    loading: false
  });
};

const authFailed = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null
  });
};

const setAuthRedirect = (state, action) => {
  return updateObject(state, {
    redirect: action.path
  });
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);

    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);

    case actionTypes.AUTH_FAILED:
      return authFailed(state, action);

    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);

    case actionTypes.SET_AUTH_REDIRECT:
      return setAuthRedirect(state, action);

    default:
      return state;
  }
};

export default authReducer;
