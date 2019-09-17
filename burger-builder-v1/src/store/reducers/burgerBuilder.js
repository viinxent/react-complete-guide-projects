import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../utils/utility';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: null,
  building: false,
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredient]: state.ingredients[action.ingredient] + 1
  };

  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);

  const updatedState = {
    building: true,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient],
    ingredients: updatedIngredients
  };

  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredient]: state.ingredients[action.ingredient] - 1
  };

  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);

  const updatedState = {
    building: true,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient],
    ingredients: updatedIngredients
  };

  return updateObject(state, updatedState);
};

const setIngredients = (state, action) => {
  const updatedState = {
    building: false,
    totalPrice: initialState.totalPrice,
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat
    }
  };

  return updateObject(state, updatedState);
};

const getIngredientsFailed = (state, action) => {
  const updatedState = { error: action.error };
  return updateObject(state, updatedState);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);

    case actionTypes.ADD_INGREDIENTS:
      return addIngredient(state, action);

    case actionTypes.REMOVE_INGREDIENTS:
      return removeIngredient(state, action);

    case actionTypes.GET_INGREDIENTS_FAILED:
      return getIngredientsFailed(state, action);

    default:
      return state;
  }
};

export default reducer;
