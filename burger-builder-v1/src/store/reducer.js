import * as actionTypes from './actions';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 4
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      return {
        ...state,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient],
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] + 1
        }
      };

    case actionTypes.REMOVE_INGREDIENTS:
      return {
        ...state,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient],
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] - 1
        }
      };

    default:
      return state;
  }
};

export default reducer;
