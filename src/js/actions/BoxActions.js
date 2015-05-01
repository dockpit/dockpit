import Reflux from 'reflux'

import Boxes from '../apis/Boxes.js'

const BoxActions = Reflux.createActions({
  'list': {children: ["complete", "error"]},
  'launch': {children: ["complete", "error"]}
})

BoxActions.list.listen(function(token) {
  Boxes.list(token).then(this.complete, this.error)
})

BoxActions.launch.listen(function(id, token) {
  Boxes.launch(id, token).then(this.complete, this.error)
})

export default BoxActions
