import Reflux from 'reflux'
import Immutable from 'immutable'

import UserActions from '../actions/UserActions.js'
import Users from '../apis/Users.js'

const UserStore = Reflux.createStore({
  listenables: UserActions,
  state: Immutable.fromJS({
    user: window.DockpitConf.user,
    isAuthenticating: false,
    authenticationError: "",
  }),

  _persistLocally(cb) {
    var newConf = window.DockpitConf
    newConf.user = this.state.get('user').toJS()
    window.dpWriteHomeConfig(newConf, cb)
  },

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

    this._persistLocally(() => this.trigger(this.state))
  },

  //
  onPaymentComplete(user) {
    this.state = this.state.set('user', Immutable.fromJS(user))
    this._persistLocally(() => this.trigger(this.state))
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
