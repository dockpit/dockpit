import React from 'react';
import Immutable from 'immutable'

import UserActions from '../actions/UserActions.js'
import UserStore from '../stores/UserStore.js'
import CreditCardForm from './CreditCardForm.jsx'

class PaymentPanel extends React.Component {

  //
  constructor(props) {
    super(props)
    this.state = {
      user: UserStore.state.get('user'),
    }

    this.onStripeToken = this.onStripeToken.bind(this)
  }

  //
  componentDidMount() {
    this.userStoreUnsubscribe = UserStore.listen( data => this.setState({ user: data.get('user') }))
  }

  //
  componentWillUnmount() {
    this.userStoreUnsubscribe()
  }

  //
  onStripeToken(stripe_token) {
    UserActions.payment(this.state.user.get('token'), stripe_token)
  }

  //
  render() {
    return <div>
      {this.state.user.get('payment_methods')}

      <CreditCardForm onStripeToken={this.onStripeToken}/>
    </div>
  }
}

export default PaymentPanel;
