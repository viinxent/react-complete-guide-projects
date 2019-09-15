import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utils';

const initialState = {
  results: []
};

const deleteResult = (state, action) => {
  return updateObject(state, {
    results: state.results.concat({
      id: new Date(),
      value: action.result
    })
  });
};

const updateResults = (state, action) => {
  const updatedResults = state.results.filter(res => res.id !== action.id);
  return updateObject(state, { results: updatedResults });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_RESULT:
      return deleteResult(state, action);

    case actionTypes.DELETE_RESULT:
      return updateResults(state, action);

    default:
      return state;
  }
};

export default reducer;
