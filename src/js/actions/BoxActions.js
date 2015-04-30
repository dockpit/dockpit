import Reflux from 'reflux'

import Boxes from '../apis/Boxes.js'

const BoxActions = Reflux.createActions({
  'list': {children: ["complete", "error"]}
})

BoxActions.list.listen( function() {
    Boxes.list().then(this.complete, this.error)
});


export default BoxActions
