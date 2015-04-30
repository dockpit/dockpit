import React from 'react';
import Immutable from 'immutable'

import OfferActions from '../actions/OfferActions.js'
import OfferStore from '../stores/OfferStore.js'
import BoxActions from '../actions/BoxActions.js'
import BoxStore from '../stores/BoxStore.js'

class OffersPanel extends React.Component {

  //
  constructor(props) {
    super(props)
    this.state = {
      offerData: Immutable.Map(),
      boxes: BoxStore.state.get('boxes')
    }
  }

  //
  componentDidMount() {
    this.offerStoreUnsubscribe = OfferStore.listen( data => this.setState({offerData: data}) )
    this.boxStoreUnsubscribe = BoxStore.listen( data => this.setState({boxes: data.get('boxes')}) )

    OfferActions.load()
    BoxActions.list()
  }

  //
  componentWillUnmount() {
    this.offerStoreUnsubscribe()
    this.boxStoreUnsubscribe()
  }

  //
  claimBox(boxid, ev) {
    ev.preventDefault()
    BoxActions.launch(boxid)
  }

  //
  render() {
    var me = this
    return <div>
      <h2>Available:</h2>
      <ul>
        {this.state.boxes.get('available').map(function(b){
          return <li key={b.get('id')}>{b.get('id')} <button onClick={me.claimBox.bind(me, b.get('id'))}>Claim!</button></li>
        })}
      </ul>

      <h2>On-Demand:</h2>
      <ul>
        {this.state.boxes.get('on_demand').map(function(b){
          return <li key={b.get('id')}>{b.get('id')} <button onClick={me.claimBox.bind(me, b.get('id'))}>Claim!</button></li>
        })}
      </ul>

      <h2>Owned:</h2>
      <ul>
        {this.state.boxes.get('owned').map(function(b){
          return <li key={b.get('id')}>{b.get('id')}</li>
        })}
      </ul>
    </div>
  }
}

export default OffersPanel;
