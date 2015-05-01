import React from 'react';
import Immutable from 'immutable'
import { RouteHandler } from 'react-router'

import UserStore from '../stores/UserStore.js'
import OffersPanel from '../components/OffersPanel.jsx'

class Daily extends React.Component {
  constructor(props) { super(props) }


  //
  render() {
    return <div>
      daily offers:
      <OffersPanel/>
    </div>
  }
}

export default Daily;
