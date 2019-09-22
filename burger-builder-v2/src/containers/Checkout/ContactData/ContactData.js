import React, { useState } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../../store/actions/index';

import { updateObject, checkValidity } from './../../../utils/utility';

import axios from '../../../axios-orders';

import withErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';

import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';

import './ContactData.css';

const ContactData = props => {
  const [form, setForm] = useState({ formIsValid: false, loading: false });
  const [inputForm, setInputForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Full name'
      },
      validation: {
        required: true
      },
      value: '',
      valid: false,
      touched: false
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Street address'
      },
      validation: {
        required: true
      },
      value: '',
      valid: false,
      touched: false
    },
    zipcode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Zip code'
      },
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5
      },
      value: '',
      valid: false,
      touched: false
    },
    country: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Country'
      },
      validation: {
        required: true
      },
      value: '',
      valid: false,
      touched: false
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Email'
      },
      validation: {
        required: true
      },
      value: '',
      valid: false,
      touched: false
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: 'fastest', displayValue: 'Fastest' },
          { value: 'cheapest', displayValue: 'Cheapest' }
        ]
      },
      value: 'fastest',
      valid: true,
      touched: false
    }
  });

  const orderHandler = event => {
    event.preventDefault();

    const formData = {};

    for (let formElementIdentifier in inputForm) {
      formData[formElementIdentifier] = inputForm[
        formElementIdentifier
      ].value;
    }

    const order = {
      ingredients: props.ingredients,
      price: props.price,
      orderData: formData,
      deliveryMethod: 'fastest',
      userId: props.userId
    };

    props.purchaseBurger(order, props.token);
  };

  const inputChangeHandler = (event, identifier) => {
    event.preventDefault();

    const updatedFormElement = updateObject(inputForm[identifier], {
      value: event.target.value,
      touched: true,
      valid: checkValidity(
        event.target.value,
        inputForm[identifier].validation
      )
    });

    const updatedOrderForm = updateObject(inputForm, {
      [identifier]: updatedFormElement
    });

    let formIsValid = true;

    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    setForm({ ...form, formIsValid });
    setInputForm(updatedOrderForm);
  };

  const formElementsArray = [];

  for (let key in inputForm) {
    formElementsArray.push({
      id: key,
      config: inputForm[key]
    });
  }

  let formComponent = (
    <form>
      {formElementsArray.map(formElement => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={Boolean(formElement.config.validation)}
          touched={formElement.config.touched}
          change={e => inputChangeHandler(e, formElement.id)}
        />
      ))}
      <Button
        disabled={!form.formIsValid}
        clicked={orderHandler}
        btnType="Success"
      >
        ORDER
      </Button>
    </form>
  );

  if (props.loading) {
    formComponent = <Spinner />;
  }

  return (
    <div className="ContactData">
      <h4>Enter your Contact Data</h4>
      {formComponent}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.order.error,
    loading: state.order.loading,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    purchaseBurger: (order, token) =>
      dispatch(actionCreators.purchaseBurger(order, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
