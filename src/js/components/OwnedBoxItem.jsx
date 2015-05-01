import React from 'react';
import Immutable from 'immutable'

import BoxActions from '../actions/BoxActions.js'

class OwnedBoxItem extends React.Component {

  //
  constructor(props) {
    super(props)

    this.open = this.open.bind(this)
    this.remove = this.remove.bind(this)
  }

  //
  componentDidMount() {
    if(!this.props.box.get('ip')) BoxActions.status(this.props.box.get('id'), this.props.user.get('token'))
  }

  //
  open(ev) {
    var me = this
    ev.preventDefault()

    //@outofreact
    //write tls to tmp directory&launch in terminal
    window.dpWriteBoxTLS(
      this.props.box.get('id'),
      this.props.box.get('ca'),
      this.props.box.get('cert'),
      this.props.box.get('key'),
      function(err, dir){
        if(err) return console.error(err)

        window.dpOpenTerminal(window.DockpitTermConfig, "osx", "terminal", {
          DOCKER_HOST: "tcp://"+me.props.box.get('ip')+":2376",
          DOCKER_CERT_PATH: dir,
        }, function(){})
      }
    )
  }

  //
  remove(ev) {
    ev.preventDefault()

    if(confirm("Are you sure you want to remove box '"+this.props.box.get('id')+"'?")) {
      BoxActions.remove(this.props.box.get('id'), this.props.user.get('token'))
    }
  }

  //
  render() {
    return <li>
      {this.props.box.get('id')}
      {this.props.box.get('ip') ? <button onClick={this.open}>Open</button> : "waiting for ip..."}
      <button onClick={this.remove}>Remove</button>
    </li>
  }
}

OwnedBoxItem.propTypes = {
  box: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
}

export default OwnedBoxItem;
