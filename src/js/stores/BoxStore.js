import Reflux from 'reflux'
import Immutable from 'immutable'

import BoxActions from '../actions/BoxActions.js'
import Boxes from '../apis/Boxes.js'

const BoxStore = Reflux.createStore({
  listenables: BoxActions,
  state: Immutable.fromJS({
    boxes: {available: [], on_demand: [], owned: []},
  }),

  //
  onListComplete(boxes) {
    this.state = this.state.set('boxes', Immutable.fromJS(boxes))
    this.trigger(this.state)
  },

  //
  onListError(err) { throw err }

});

export default BoxStore
