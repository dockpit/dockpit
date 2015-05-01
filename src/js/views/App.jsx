import React from 'react';
import Immutable from 'immutable'
import { RouteHandler } from 'react-router'

import UserStore from '../stores/UserStore.js'
import LoginPanel from '../components/LoginPanel.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: Immutable.fromJS({}),
    }
  }

  //
  componentDidMount() {
    this.userStoreUnsubscribe = UserStore.listen( data => this.setState({ user: data.get('user') }))
  }

  //
  componentWillUnmount() {
    this.userStoreUnsubscribe()
  }

  //
  render() {
    var user = this.state.user
    if (user.get('token')) {
      return <div>
        <span>Logged in as <a href="#">{user.get('email')}</a></span>
        <RouteHandler/>
      </div>
    }

    return <div>
      <LoginPanel/>

      <RouteHandler/>

    </div>
  }
}

export default App;
