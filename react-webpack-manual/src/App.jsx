import React, { Component, Suspense } from 'react'
import { Link, Route } from 'react-router-dom'

const Pizza = React.lazy(() => import('./containers/Pizza'))
const Users = React.lazy(() => import('./containers/Users'))

const Loading = () => <p>Loading...</p>

class App extends Component {
  render () {
    return (
      <div>
        <div>
          <Link to="/">Users</Link>
          <Link to="/pizza">Pizza</Link>
        </div>
        <Suspense fallback={<Loading />}>
          <div>
            <Route path="/" exact component={Users} />
            <Route path="/pizza" component={Pizza} />
          </div>
        </Suspense>
      </div>
    )
  }
}

export default App
