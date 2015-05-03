import Reflux from 'reflux'
import Immutable from 'immutable'

import OfferActions from '../actions/OfferActions.js'

const OfferStore = Reflux.createStore({
  listenables: OfferActions,
  state: Immutable.fromJS({
    offers: [],
  }),

  //
  onListComplete(offers) {
    this.state = this.state.set('offers', Immutable.fromJS(offers))
    this.trigger(this.state)
  }
})

export default OfferStore
