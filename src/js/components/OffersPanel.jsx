import React from 'react';
import Immutable from 'immutable'

import UserStore from '../stores/UserStore.js'
import BoxActions from '../actions/BoxActions.js'
import BoxStore from '../stores/BoxStore.js'
import BoxItem from './BoxItem.jsx'
import OwnedBoxItem from './OwnedBoxItem.jsx'

class OffersPanel extends React.Component {

  //
  constructor(props) {
    super(props)
    this.state = {
      boxes: BoxStore.state.get('boxes'),
      user: UserStore.state.get('user'),
      launching: "",
    }

    this.claim = this.claim.bind(this)
  }

  //
  componentDidMount() {
    this.boxStoreUnsubscribe = BoxStore.listen( data => this.setState({
      boxes: data.get('boxes'),
      launching: data.get('launching'),
    }))

    this.userStoreUnsubscribe = UserStore.listen( data => this.setState({ user: data.get('user') }))
    BoxActions.list(this.state.user.get('token'))
  }

  //
  componentWillUnmount() {
    this.offerStoreUnsubscribe()
    this.boxStoreUnsubscribe()
    this.userStoreUnsubscribe()
  }

  //
  claim(boxid, ev) {
    ev.preventDefault()
    BoxActions.launch(boxid, this.state.user.get('token'))
  }

  //
  render() {
    var me = this

    var OwnedBoxes
    if(this.state.user.get('token')) {
      OwnedBoxes = <div>
        <h2>Owned:</h2>
        <ul>
          {this.state.boxes.get('owned').map(function(b){
            return <OwnedBoxItem key={b.get('id')} box={b} user={me.state.user}/>
          })}
        </ul>
      </div>
    }

    return <div>
      <h2>Available:</h2>
      <ul>
        {this.state.boxes.get('available').map(function(b){
          return <BoxItem launching={me.state.launching} key={b.get('id')} box={b} user={me.state.user}/>
        })}
      </ul>

      <h2>On-Demand:</h2>
      <ul>
        {this.state.boxes.get('on_demand').map(function(b){
          return <BoxItem launching={me.state.launching} key={b.get('id')} box={b} user={me.state.user}/>
        })}
      </ul>

      {OwnedBoxes}
    </div>
  }
}

export default OffersPanel;
