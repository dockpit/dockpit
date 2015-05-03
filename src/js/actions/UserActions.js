import Reflux from 'reflux'

import Users from '../apis/Users.js'

const UserActions = Reflux.createActions({
  'authenticate': {children: ["complete", "error"]},
  'payment': {children: ["complete", "error"]},
})

UserActions.authenticate.listen(function(email, password) {
  Users.authenticate(email, password).then(this.complete, this.error)
})

UserActions.payment.listen(function(token, stripe_token) {
  Users.payment(token, stripe_token).then(this.complete, this.error)
})

export default UserActions
