import * as actionTypes from './actionTypes';

export const addIngredients = ingredient => {
  return { type: actionTypes.ADD_INGREDIENTS, ingredient };
};

export const removeIngredients = ingredient => {
  return { type: actionTypes.REMOVE_INGREDIENTS, ingredient };
};

export const getIngredients = () => {
  return { type: actionTypes.GET_INGREDIENTS };
};

export const getIngredientsFailed = error => {
  return { type: actionTypes.GET_INGREDIENTS_FAILED, error };
};

export const setIngredients = ingredients => {
  return { type: actionTypes.SET_INGREDIENTS, ingredients };
};
