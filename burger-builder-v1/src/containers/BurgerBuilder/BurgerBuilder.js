import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions';

import axios from '../../axios-orders';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
    error: null
  };

  componentDidMount() {
    // axios
    //   .get('/ingredients.json')
    //   .then(response => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch(error => {
    //     this.setState({ error: error });
    //   });
  }

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);

    return sum > 0;
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };

  render() {
    const {
      addIngredient,
      ingredients,
      removeIngredient,
      totalPrice
    } = this.props;

    const disabledInfo = { ...ingredients };

    for (let key in disabledInfo) {
      disabledInfo[key] = Boolean(!disabledInfo[key]);
    }

    let orderSummary = null;

    let burger = this.state.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );

    if (ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={ingredients} />
          <BuildControls
            disabled={disabledInfo}
            ingredientAdded={addIngredient}
            ingredientRemoved={removeIngredient}
            ordered={this.purchaseHandler}
            price={totalPrice}
            purchasable={this.updatePurchaseState(ingredients)}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={ingredients}
          price={totalPrice}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addIngredient: ingredient =>
      dispatch({ type: actionTypes.ADD_INGREDIENTS, ingredient }),
    removeIngredient: ingredient =>
      dispatch({ type: actionTypes.REMOVE_INGREDIENTS, ingredient })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
