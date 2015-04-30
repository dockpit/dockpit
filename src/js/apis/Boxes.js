import request from 'superagent'
import shared from './shared.js'

const Boxes = {

  //boxes.list
  list() {
    return new Promise((resolve, reject) => {
      request
        .post(shared.endpoint + "/api/boxes.list")
        .set('Accept', 'application/json')
        .end(shared.responseHandler(resolve, reject, "boxes"))
    })
  },

  //boxes.launch
  launch(id) {
    return new Promise((resolve, reject) => {
      request
        .post(shared.endpoint + "/api/boxes.launch?box="+id)
        .set('Accept', 'application/json')
        .end(shared.responseHandler(resolve, reject, "box"));
    })
  }

}

export default Boxes
