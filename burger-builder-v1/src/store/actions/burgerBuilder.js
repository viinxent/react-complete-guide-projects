import * as actionTypes from './actionTypes';

import axios from '../../axios-orders';

export const addIngredients = ingredient => {
  return { type: actionTypes.ADD_INGREDIENTS, ingredient };
};

export const removeIngredients = ingredient => {
  return { type: actionTypes.REMOVE_INGREDIENTS, ingredient };
};

export const getIngredients = () => {
  return dispatch => {
    axios
      .get('/ingredients.json')
      .then(response => {
        dispatch(setIngredients(response.data));
      })
      .catch(error => {
        dispatch(getIngredientsFailed(error));
      });
  };
};

export const getIngredientsFailed = (error) => {
  return { type: actionTypes.GET_INGREDIENTS_FAILED, error };
};

export const setIngredients = ingredients => {
  return { type: actionTypes.SET_INGREDIENTS, ingredients };
};
