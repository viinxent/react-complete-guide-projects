import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  NavLink,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import Courses from './containers/Courses/Courses';
import Users from './containers/Users/Users';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <header>
            <nav>
              <NavLink to="/courses">Courses</NavLink>
              &nbsp;
              <NavLink to="/users">Users</NavLink>
            </nav>
          </header>
          <Switch>
            <Route path="/courses" component={Courses} />
            <Route path="/users" component={Users} />
            <Redirect from="/all-courses" to="courses" />
            <Route component={() => <h1>404: Not found</h1>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
