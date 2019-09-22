import React, { useCallback, useReducer, useMemo, useEffect } from 'react';

import useRequest from '../../hooks/http';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const ingredientReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload;

    case 'ADD':
      return [...state, action.payload];

    case 'DELETE':
      return state.filter(ingredient => action.id !== ingredient.id);

    default:
      throw new Error('Unknown action');
  }
};

const Ingredients = () => {
  const [ingredients, ingredientsDispatch] = useReducer(ingredientReducer, []);
  const {
    clearError,
    data,
    error,
    extra,
    loading,
    method,
    sendRequest,
  } = useRequest();

  useEffect(() => {
    switch (method) {
      case 'DELETE':
        ingredientsDispatch({ type: 'DELETE', id: extra.id });
        break;

      case 'POST':
        if (!data) return;
        ingredientsDispatch({
          type: 'ADD',
          payload: { ...extra, id: data.name }
        });
        break;

      default:
        break;
    }
  }, [data, extra, method]);

  const addIngredientHandler = useCallback(
    ingredient => {
      sendRequest(
        'https://react-hooks-c0ab2.firebaseio.com/ingredients.jsn',
        'POST',
        JSON.stringify(ingredient),
        ingredient
      );
    },
    [sendRequest]
  );

  const removeIngredientHandler = useCallback(
    id => {
      sendRequest(
        `https://react-hooks-c0ab2.firebaseio.com/ingredients/${id}.json`,
        'DELETE',
        null,
        { id }
      );
      ingredientsDispatch({ type: 'DELETE', id });
    },
    [sendRequest]
  );

  const searchIngredients = useCallback(
    ingredients => {
      ingredientsDispatch({ type: 'SET', payload: ingredients });
    },
    [ingredientsDispatch]
  );

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        onRemoveItem={removeIngredientHandler}
        ingredients={ingredients}
      />
    );
  }, [ingredients, removeIngredientHandler]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}

      <IngredientForm submit={addIngredientHandler} loading={loading} />

      <section>
        <Search onSearch={searchIngredients} />
        {ingredientList}
      </section>
    </div>
  );
};

export default Ingredients;
