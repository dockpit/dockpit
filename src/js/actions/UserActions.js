import Reflux from 'reflux'

import Users from '../apis/Users.js'

const UserActions = Reflux.createActions({
  'authenticate': {children: ["complete", "error"]},
})

UserActions.authenticate.listen(function(email, password) {
  Users.authenticate(email, password).then(this.complete, this.error)
})

export default UserActions
