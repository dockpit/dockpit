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
      boxData: BoxStore.state
    }
  }

  //
  componentDidMount() {
    this.offerStoreUnsubscribe = OfferStore.listen( data => this.setState({offerData: data}) )
    this.boxStoreUnsubscribe = BoxStore.listen( data => this.setState({boxData: data}) )

    OfferActions.load()
    BoxActions.list()
  }

  //
  componentWillUnmount() {
    this.offerStoreUnsubscribe()
    this.boxStoreUnsubscribe()
  }

  //
  render() {
    return <div>Hello {this.state.boxData}</div>
  }
}


export default OffersPanel;
