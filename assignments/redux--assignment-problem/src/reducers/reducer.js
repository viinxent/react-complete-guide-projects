import * as actionTypes from './actions';

const initState = {
  users: []
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.ADD_USER:
      return {
        ...state,
        users: state.users.concat(action.user)
      };

    case actionTypes.DELETE_USER:
      return {
        ...state,
        users: state.users.filter(person => person.id !== action.id)
      };

    default:
      return state;
  }
};

export default reducer;
