import * as actionTypes from './actionTypes';

export const storeResultDispatch = result => {
  return { type: actionTypes.STORE_RESULT, result };
};
export const storeResult = result => {
  return dispatch => {
    setTimeout(() => {
      dispatch(storeResultDispatch(result));
    }, 2000);
  };
};

export const deleteResult = id => {
  return { type: actionTypes.DELETE_RESULT, id };
};
