import Reflux from 'reflux'

import Boxes from '../apis/Boxes.js'

const BoxActions = Reflux.createActions({
  'list': {children: ["complete", "error"]},
  'launch': {children: ["complete", "error"]},
  'status': {children: ["complete", "error"]},
  'remove': {children: ["complete", "error"]},
})

BoxActions.list.listen(function(token) {
  Boxes.list(token).then(this.complete, this.error)
})

BoxActions.launch.listen(function(id, token) {
  Boxes.launch(id, token).then(this.complete, this.error)
})

BoxActions.status.listen(function(id, token) {
  Boxes.status(id, token).then(this.complete, this.error)
})

BoxActions.remove.listen(function(id, token) {
  Boxes.remove(id, token).then(this.complete, this.error)
})

export default BoxActions
