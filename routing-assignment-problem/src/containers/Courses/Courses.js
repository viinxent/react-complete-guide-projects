import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import Course from '../Course/Course';

import './Courses.css';

class Courses extends Component {
  state = {
    courses: [
      { id: 1, title: 'Angular - The Complete Guide' },
      { id: 2, title: 'Vue - The Complete Guide' },
      { id: 3, title: 'PWA - The Complete Guide' }
    ]
  };

  render() {
    return (
      <div>
        <h1>Amazing Udemy Courses</h1>
        <section className="Courses">
          {this.state.courses.map(course => {
            const params = {
              title: course.title,
            };

            const queryParams = Object.keys(params).map(key => key + '=' + params[key]).join('&');

            return (
              <Link
                to={{
                  pathname: this.props.match.path + '/' + course.id,
                  search: encodeURI(queryParams)
                }}
                key={course.id}
              >
                <article className="Course">{course.title}</article>
              </Link>
            );
          })}
        </section>
        <Route path={this.props.match.path + '/:id'} component={Course} />
      </div>
    );
  }
}

export default Courses;
