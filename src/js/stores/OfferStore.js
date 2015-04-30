import Reflux from 'reflux'

import OfferActions from '../actions/OfferActions.js'

const OfferStore = Reflux.createStore({
  
  init() {
    this.listenTo(OfferActions.load, function(){
      console.log("load offers")

      this.trigger("test")
    });
  },

});

export default OfferStore