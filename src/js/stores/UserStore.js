import Reflux from 'reflux'
import Immutable from 'immutable'

import UserActions from '../actions/UserActions.js'
import Users from '../apis/Users.js'

const UserStore = Reflux.createStore({
  listenables: UserActions,
  state: Immutable.fromJS({
    user: {},
    isAuthenticating: false,
    authenticationError: "",
  }),

  //
  onAuthenticate() {
    this.state = this.state.set('isAuthenticating', true)
    this.trigger(this.state)
  },

  //
  onAuthenticateComplete(user) {
    this.state = this.state.set('user', Immutable.fromJS(user))
    this.state = this.state.set('authenticationError', "")
    this.state = this.state.set('isAuthenticating', false)

    this.trigger(this.state)
  },

  //
  onAuthenticateError(err) {
    console.error(err)
    this.state = this.state.set('authenticationError', err)
    this.state = this.state.set('isAuthenticating', false)

    this.trigger(this.state)
  }

});

export default UserStore
