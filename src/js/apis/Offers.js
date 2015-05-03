import request from 'superagent'
import shared from './shared.js'

const Offers = {

  //offers.list
  list() {
    return new Promise((resolve, reject) => {
      request
        .post(shared.endpoint + "/api/offers.list")
        .set('Accept', 'application/json')
        .end(shared.responseHandler(resolve, reject, "offers"))
    })
  },

}

export default Offers
