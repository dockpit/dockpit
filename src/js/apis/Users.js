import request from 'superagent'
import shared from './shared.js'

const Users = {

  //users.authenticate
  authenticate(email, password) {
    return new Promise((resolve, reject) => {
      request
        .post(shared.endpoint + "/api/users.authenticate?email="+email+"&password="+password)
        .set('Accept', 'application/json')
        .end(shared.responseHandler(resolve, reject, "user"));
    })
  }

}

export default Users
