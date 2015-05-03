import React from 'react';
import Immutable from 'immutable'

import UserActions from '../actions/UserActions.js'
import UserStore from '../stores/UserStore.js'

class CreditCardForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: "",
      number: "",
      cvc: "",
      expMonth: "",
      expYear: "",
      disabled: "",
    }

    this.submit = this.submit.bind(this)
    this.onNumberChange = this.onNumberChange.bind(this)
    this.onCVCChange = this.onCVCChange.bind(this)
    this.onExpMonthChange = this.onExpMonthChange.bind(this)
    this.onExpYearChange = this.onExpYearChange.bind(this)
  }

  submit(ev) {
    ev.preventDefault()
    if(this.state.disabled) {
      return
    }

    this.setState({disabled: "disabled"})
    Stripe.card.createToken(this.refs.form.getDOMNode(), (status, response) => {
      if(response.error) {
        this.setState({error: response.error.message})
      } else {
        this.props.onStripeToken(response.id)
      }

      this.setState({disabled: ""})
    })
  }

  //
  onNumberChange(ev) { this.setState({number: ev.target.value}) }
  onCVCChange(ev) { this.setState({cvc: ev.target.value}) }
  onExpMonthChange(ev) { this.setState({expMonth: ev.target.value}) }
  onExpYearChange(ev) { this.setState({expYear: ev.target.value}) }

  render() {
    return <form ref="form" onSubmit={this.submit}>
      {this.state.error ? <div>{this.state.error}</div> : null}

      <div>
        <label>
          <span>Card Number</span>
          <input
            type="text"
            size="20"
            disabled={this.state.disabled}
            value={this.state.number}
            onChange={this.onNumberChange}
            data-stripe="number"/>
        </label>
      </div>

      <div>
        <label>
          <span>CVC</span>
          <input
            type="text"
            size="4"
            disabled={this.state.disabled}
            value={this.state.cvc}
            onChange={this.onCVCChange}
            data-stripe="cvc"/>
        </label>
      </div>

      <div>
        <label>
          <span>Expiration (MM/YYYY)</span>
          <input
            type="text"
            size="2"
            disabled={this.state.disabled}
            value={this.state.expMonth}
            onChange={this.onExpMonthChange}
            data-stripe="exp-month"/>
        </label>
        <span> / </span>
        <input
          type="text"
          size="4"
          disabled={this.state.disabled}
          value={this.state.expYear}
          onChange={this.onExpYearChange}
          data-stripe="exp-year"/>
      </div>

      <button disabled={this.state.disabled}>submit</button>
    </form>
  }
}

CreditCardForm.propTypes = {
  onStripeToken: React.PropTypes.func.isRequired,
}
export default CreditCardForm
