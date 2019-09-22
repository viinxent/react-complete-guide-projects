import React, { useState } from 'react';

import Card from '../UI/Card';
import Loading from '../UI/LoadingIndicator';

import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const submitHandler = event => {
    event.preventDefault();
    props.submit({ title, amount });
  };

  const inputHandler = event => {
    event.preventDefault();

    const id = event.target.getAttribute('id');
    const value = event.target.value;

    switch (id) {
      case 'title':
        setTitle(value);
        break;

      case 'amount':
        setAmount(value);
        break;

      default:
        return;
    }
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={inputHandler}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={inputHandler}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.loading && <Loading />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
