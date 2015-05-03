import React from 'react';
import Immutable from 'immutable'
import { RouteHandler } from 'react-router'

import UserStore from '../stores/UserStore.js'
import OffersPanel from '../components/OffersPanel.jsx'
import PaymentPanel from '../components/PaymentPanel.jsx'

class Daily extends React.Component {
  constructor(props) { super(props) }


  //
  render() {
    return <div>
      <PaymentPanel/>

      daily offers:
      <OffersPanel/>
    </div>
  }
}

export default Daily;
