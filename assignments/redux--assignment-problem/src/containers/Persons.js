import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../reducers/actions';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';

class Persons extends Component {
  personAddedHandler = (name, age) => {
    const newPerson = {
      id: Math.random(), // not really unique but good enough here!
      name,
      age,
    };

    this.props.addUser(newPerson);
  };

  render() {
    return (
      <div>
        <AddPerson personAdded={this.personAddedHandler} />
        {this.props.persons.map(person => (
          <Person
            key={person.id}
            name={person.name}
            age={person.age}
            clicked={() => this.props.deleteUser(person.id)}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    persons: state.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addUser: user => dispatch({ type: actionTypes.ADD_USER, user }),
    deleteUser: id => dispatch({ type: actionTypes.DELETE_USER, id })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Persons);
