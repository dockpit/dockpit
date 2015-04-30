import React from 'react';
import Immutable from 'immutable'

import UserActions from '../actions/UserActions.js'
import UserStore from '../stores/UserStore.js'

class LoginPanel extends React.Component {

  //
  constructor(props) {
    super(props)
    this.state = {
      creds: Immutable.fromJS({
        email: "",
        password: "",
      }),
      user: Immutable.fromJS({}),
      error: ""
    }

    this.login = this.login.bind(this)
    this.onEmailChange = this.onEmailChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
  }

  //
  componentDidMount() {
    this.unsubscribe = UserStore.listen( data => this.setState({
      user: data.get('user'),
      error: data.get('authenticationError'),
    }))
  }

  //
  componentWillUnmount() {
    this.unsubscribe()
  }

  //
  login(ev) {
    ev.preventDefault()
    UserActions.authenticate(this.state.creds.get('email'), this.state.creds.get('password'))
  }

  //
  onEmailChange(ev) { this.setState({creds: this.state.creds.set('email', ev.target.value)}) }
  onPasswordChange(ev) { this.setState({creds: this.state.creds.set('password', ev.target.value)}) }

  //
  render() {
    return <div>
        {this.state.user.get('token')}
        <form onSubmit={this.login}>
          {this.state.error ? <div>{this.state.error}</div> : null}
          <input type="text" placeholder="email" value={this.state.creds.get('email')} onChange={this.onEmailChange} />
          <input type="password" placeholder="password" value={this.state.creds.get('password')} onChange={this.onPasswordChange} />
          <button>Login</button>
        </form>
    </div>
  }
}

export default LoginPanel;
