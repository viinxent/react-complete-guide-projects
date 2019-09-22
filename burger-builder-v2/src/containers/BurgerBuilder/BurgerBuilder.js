import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as actionCreators from '../../store/actions/index';

import axios from '../../axios-orders';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

const BurgerBuilder = props => {
  const { history } = props;
  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();
  const { ingredients, totalPrice, error, isAuthenticated } = useSelector(
    state => {
      return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: Boolean(state.auth.token)
      };
    }
  );

  const addIngredient = ingredient =>
    dispatch(actionCreators.addIngredients(ingredient));

  const removeIngredient = ingredient =>
    dispatch(actionCreators.removeIngredients(ingredient));

  const onSetAuthRedirect = path =>
    dispatch(actionCreators.setAuthRedirect(path));

  const getIngredients = useCallback(
    () => dispatch(actionCreators.getIngredients()),
    [dispatch]
  );

  useEffect(() => {
    getIngredients();
  }, [getIngredients]);

  const updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);

    return sum > 0;
  };

  const purchaseHandler = () => {
    if (!isAuthenticated) {
      onSetAuthRedirect('/checkout');
      history.push('/auth');
      return;
    }

    setPurchasing(true);
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    history.push('/checkout');
  };

  const disabledInfo = { ...ingredients };

  for (let key in disabledInfo) {
    disabledInfo[key] = Boolean(!disabledInfo[key]);
  }

  let orderSummary = null;

  let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />;

  if (ingredients) {
    burger = (
      <Aux>
        <Burger ingredients={ingredients} />
        <BuildControls
          disabled={disabledInfo}
          ingredientAdded={addIngredient}
          ingredientRemoved={removeIngredient}
          ordered={purchaseHandler}
          price={totalPrice}
          purchasable={updatePurchaseState(ingredients)}
          isAuthenticated={isAuthenticated}
        />
      </Aux>
    );

    orderSummary = (
      <OrderSummary
        ingredients={ingredients}
        price={totalPrice}
        purchaseCanceled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
      />
    );
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

export default withErrorHandler(BurgerBuilder, axios);
