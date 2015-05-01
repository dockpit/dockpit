import Reflux from 'reflux'
import Immutable from 'immutable'

import UserStore from './UserStore.js'
import BoxActions from '../actions/BoxActions.js'

const BoxStore = Reflux.createStore({
  listenables: BoxActions,
  state: Immutable.fromJS({
    boxes: {available: [], on_demand: [], owned: []},
    launching: ""
  }),

  //
  init() {
    this.listenTo(UserStore, this.onUserStoreChanged);
  },

  // relist boxes when the user logs in
  onUserStoreChanged(data) {
    var user = data.get('user')
    if(user.get('token')) {
      BoxActions.list(user.get('token'))
    }
  },

  //
  onListComplete(boxes) {
    this.state = this.state.set('boxes', Immutable.fromJS(boxes))
    this.trigger(this.state)
  },

  //
  onListError(err) { throw err },

  //
  onLaunch(id) {
    this.state = this.state.set('launching', id)
    this.trigger(this.state)
  },

  //
  onLaunchComplete(box) {
    this.state = this.state.set('launching', "")
    this.trigger(this.state)
  },

  //
  onLaunchError(err) {
    console.error(err)
    this.state = this.state.set('launching', "")
    this.trigger(this.state)
  },

});

export default BoxStore
