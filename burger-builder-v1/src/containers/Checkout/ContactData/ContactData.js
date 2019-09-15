import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';

import './ContactData.css';

class ContactData extends Component {
  state = {
    orderForm: {
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
        touched: false,
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
        touched: false,
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
          maxLength: 5,
        },
        value: '',
        valid: false,
        touched: false,
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
        touched: false,
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
        touched: false,
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
        touched: false,
      },
    },
    formIsValid: false,
    loading: false,
  };

  orderHandler = event => {
    event.preventDefault();

    this.setState({ loading: true });

    const formData = {};

    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
      deliveryMethod: 'fastest'
    };

    axios
      .post('/orders.json', order)
      .then(() => {
        this.setState({ loading: false, purchasing: false });
        this.props.history.replace('/');
      })
      .catch(() => {
        this.setState({ loading: false, purchasing: false });
      });
  }

  checkValidity = (value, rules) => {
    let isValid = true;

    if (!rules) {
      return isValid;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.trim().length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.trim().length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  inputChangeHandler = (e, identifier) => {
    e.preventDefault();

    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[identifier] };

    updatedFormElement.value = e.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;

    let formIsValid = true;

    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    updatedOrderForm[identifier] = updatedFormElement;

    this.setState({ orderForm: updatedOrderForm, formIsValid });
  }

  render() {
    const formElementsArray = [];

    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
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
            change={(e) => this.inputChangeHandler(e, formElement.id)}
          />
        ))}
        <Button disabled={!this.state.formIsValid} clicked={this.orderHandler} btnType="Success">
          ORDER
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className="ContactData">
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    price: state.totalPrice,
  };
}

export default connect(mapStateToProps)(ContactData);
