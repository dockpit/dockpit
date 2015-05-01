import request from 'superagent'
import shared from './shared.js'

const Boxes = {

  //boxes.list
  list(token) {
    return new Promise((resolve, reject) => {
      request
        .post(shared.endpoint + "/api/boxes.list?token="+(token ? token : ""))
        .set('Accept', 'application/json')
        .end(shared.responseHandler(resolve, reject, "boxes"))
    })
  },

  //boxes.launch
  launch(id, token) {
    return new Promise((resolve, reject) => {
      request
        .post(shared.endpoint + "/api/boxes.launch?box="+id+"&token="+token)
        .set('Accept', 'application/json')
        .end(shared.responseHandler(resolve, reject, "box"));
    })
  },

  //boxes.status
  status(id, token) {
    return new Promise((resolve, reject) => {
      request
        .post(shared.endpoint + "/api/boxes.status?box="+id+"&token="+token)
        .set('Accept', 'application/json')
        .end(shared.responseHandler(resolve, reject, "box"));
    })
  }

}

export default Boxes
