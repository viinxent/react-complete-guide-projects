import React, { Component } from 'react';

class Course extends Component {
  render() {
    const queryParams = new URLSearchParams(this.props.location.search);

    return (
      <div>
        <h1>{queryParams.get('title')}</h1>
        <p>You selected the Course with ID: {this.props.match.params.id}</p>
      </div>
    );
  }
}

export default Course;
