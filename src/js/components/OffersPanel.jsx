import React from 'react';
import Immutable from 'immutable'

import OfferStore from '../stores/OfferStore.js'
import OfferActions from '../actions/OfferActions.js'
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
      offers: OfferStore.state.get('offers'),
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
    this.offerStoreUnsubscribe = OfferStore.listen( data => this.setState({ offers: data.get('offers') }))

    BoxActions.list(this.state.user.get('token'))
    OfferActions.list(this.state.user.get('token'))
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

    var mapped = this.state.offers.map((o) => {
      var available = []
      this.state.boxes.get('available').forEach((b) => {
        if(b.get("box_template") == o.get("box_template")) {
          available.push(b)
        }
      })

      if(available.length < 1) {
        this.state.boxes.get('on_demand').forEach((b) => {
          available.push(b)
        })
      }

      return o.set("boxes", Immutable.fromJS(available))
    })

    return <div>
      offers: <span>{this.state.offers.size}</span>
      <h2>Available:</h2>
      <ul>
        {mapped.map(function(o, idx){
          return <li key={idx}>
            <span>{o.get("token")}</span>
            <ul>
            {o.get('boxes').map(function(b){
              return <BoxItem
                        launching={me.state.launching}
                        key={b.get('id')}
                        offer={o}
                        box={b}
                        user={me.state.user}/>
            })}
            </ul>
          </li>
        })}
      </ul>

      {OwnedBoxes}
    </div>
  }
}

export default OffersPanel;
