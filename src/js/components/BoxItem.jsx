import React from 'react';
import Immutable from 'immutable'

import BoxActions from '../actions/BoxActions.js'

class BoxItem extends React.Component {

  //
  constructor(props) {
    super(props)

    this.claim = this.claim.bind(this)
  }

  //
  claim(ev) {
    ev.preventDefault()

    if(this.props.user.get('token')) {
      BoxActions.launch(this.props.box.get('id'), this.props.user.get('token'), this.props.offer.get('token'))
    }else {
      //@todo add login modal
      console.log("not logged in")
    }
  }

  //
  render() {
    return <li>
      {this.props.box.get('id')}
      <button onClick={this.claim}>
        Claim{this.props.launching == this.props.box.get('id') ? "..." : "!"}
      </button>
    </li>
  }
}

BoxItem.propTypes = {
  box: React.PropTypes.object.isRequired,
  offer: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
  launching: React.PropTypes.string.isRequired,
}

export default BoxItem;
