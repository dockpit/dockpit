import Reflux from 'reflux'

import Offers from '../apis/Offers.js'

const OfferActions = Reflux.createActions({
  'list': {children: ["complete", "error"]},
})

OfferActions.list.listen(function() {
  Offers.list().then(this.complete, this.error)
})

export default OfferActions
