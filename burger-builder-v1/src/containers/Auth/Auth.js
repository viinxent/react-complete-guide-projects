import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { updateObject, checkValidity } from '../../utils/utility';

import * as actionCreators from '../../store/actions/index';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';

import './Auth.css';

class Auth extends Component {
  state = {
    controls: {
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
    },
    isSignUp: true
  };

  componentDidMount() {
    if (!this.props.isBuildingBurger && this.props.authRedirect !== '/') {
      this.props.onSetAuthRedirect();
    }
  }

  inputChangeHandler = (e, identifier) => {
    e.preventDefault();

    const updatedFormElement = updateObject(this.state.controls[identifier], {
      value: e.target.value,
      valid: checkValidity(
        e.target.value,
        this.state.controls[identifier].validation
      ),
      touched: true
    });

    const updatedControls = updateObject(this.state.controls, {
      [identifier]: updatedFormElement
    });

    let formIsValid = true;

    for (let inputIdentifier in updatedControls) {
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    }

    this.setState({ controls: updatedControls });
  };

  submitHandler = e => {
    e.preventDefault();

    const { email, password } = this.state.controls;

    this.props.authenticate(email.value, password.value, this.state.isSignUp);
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to={this.props.authRedirect} />;
    }

    const formElementsArray = [];

    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
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
        change={e => this.inputChangeHandler(e, formElement.id)}
      />
    ));

    return (
      <div className="Auth">
        {this.props.error && <p>{this.props.error.message}</p>}

        {this.props.loading ? (
          <Spinner />
        ) : (
          <form onSubmit={this.submitHandler}>
            {form}
            <Button btnType="Success">SUBMIT</Button>
          </form>
        )}

        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          SWITCH TO {this.state.isSignUp ? 'SIGN-IN' : 'SIGN-UP'}
        </Button>
      </div>
    );
  }
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
