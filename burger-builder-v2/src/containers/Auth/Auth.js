import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { updateObject, checkValidity } from '../../utils/utility';

import * as actionCreators from '../../store/actions/index';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';

import './Auth.css';

const Auth = props => {
  const {
    authRedirect,
    authenticate,
    error,
    isAuthenticated,
    isBuildingBurger,
    loading,
    onSetAuthRedirect
  } = props;

  const [isSignUp, setIsSignUp] = useState(false);
  const [controls, setControls] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Email address'
      },
      validation: {
        required: true,
        isEmail: true
      },
      value: '',
      valid: false,
      touched: false
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password'
      },
      validation: {
        required: true,
        minLength: 7
      },
      value: '',
      valid: false,
      touched: false
    }
  });

  useEffect(() => {
    if (!isBuildingBurger && authRedirect !== '/') {
      onSetAuthRedirect();
    }
  }, [isBuildingBurger, authRedirect, onSetAuthRedirect]);

  const inputChangeHandler = (e, identifier) => {
    e.preventDefault();

    const updatedFormElement = updateObject(controls[identifier], {
      value: e.target.value,
      valid: checkValidity(
        e.target.value,
        controls[identifier].validation
      ),
      touched: true
    });

    const updatedControls = updateObject(controls, {
      [identifier]: updatedFormElement
    });

    let formIsValid = true;

    for (let inputIdentifier in updatedControls) {
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    }

    setControls(updatedControls);
  };

  const submitHandler = e => {
    e.preventDefault();

    const { email, password } = controls;

    authenticate(email.value, password.value, isSignUp);
  };

  const switchAuthModeHandler = () => {
    setIsSignUp(!isSignUp);
  };

  if (isAuthenticated) {
    return <Redirect to={authRedirect} />;
  }

  const formElementsArray = [];

  for (let key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key]
    });
  }

  const form = formElementsArray.map(formElement => (
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
  ));

  return (
    <div className="Auth">
      {error && <p>{error.message}</p>}

      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
      )}

      <Button btnType="Danger" clicked={switchAuthModeHandler}>
        SWITCH TO {isSignUp ? 'SIGN-IN' : 'SIGN-UP'}
      </Button>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: Boolean(state.auth.token),
    isBuildingBurger: state.burgerBuilder.building,
    authRedirect: state.auth.redirect
  };
};

const mapDispatchProps = dispatch => {
  return {
    authenticate: (email, password, isSignUp) =>
      dispatch(actionCreators.auth(email, password, isSignUp)),
    onSetAuthRedirect: () => dispatch(actionCreators.setAuthRedirect('/'))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchProps
)(Auth);
