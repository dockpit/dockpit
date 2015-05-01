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

  // relist boxes when the user store changes
  onUserStoreChanged(data) {
    BoxActions.list(UserStore.state.get('user').get('token'))
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

    BoxActions.status(box.id, UserStore.state.get('user').get('token'))
    BoxActions.list(UserStore.state.get('user').get('token'))
  },

  //
  onLaunchError(err) {
    console.error(err)
    this.state = this.state.set('launching', "")
    this.trigger(this.state)
  },

  //
  onRemoveComplete(box) {
    BoxActions.list(UserStore.state.get('user').get('token'))
  },

  //
  onStatusComplete(box) {
    var ip = box.ip
    if(!ip) {
      //no ip yet? poll every 1000 second until we do
      return setTimeout(function(){
        BoxActions.status(box.id, UserStore.state.get('user').get('token'))
      }, 1000)
    }

    //@todo wait for docker to be available

    //@todo, alternatively the boxes state can be updated manually
    //to save on requests quota
    BoxActions.list(UserStore.state.get('user').get('token'))
  },

});

export default BoxStore
