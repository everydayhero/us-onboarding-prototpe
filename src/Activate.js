import React from 'react'
import { hashHistory } from 'react-router'
import TextInput from 'hero-ui/forms/TextInput'
import Button from 'hero-ui/buttons/Button'

import activation from './activation.png'
import './Activate.scss'

export default React.createClass({
  getInitialState() {
    return {
      password: '',
      showError: false
    }
  },

  simulateActivate() {
    if (!this.state.password) {
      this.setState({
        showError: true
      })

      return
    }

    hashHistory.push('end')
  },

  handlePasswordChange(text) {
    this.setState({ password: text })
  },

  render() {

    const { orgName } = this.props.location.query

    return (
      <div className="Activation">
        <div className="Activation__wrapper">
          <div className="Activation__content">
            <img src={ activation } alt="activation" />
            <div className="Activation__heading">
              Welcome Aboard
            </div>
            <div className="Activation__subtitle">
              Complete the activation of { orgName } by entering a password for your user account.
            </div>
          </div>

          <TextInput
            label="Enter a password"
            onChange={ this.handlePasswordChange }
            value={ this.state.password }
            type="password"
            errorMessage="Enter a password to continue."
            showError={ this.state.showError }
            required />
          <Button
            className="Activation__button"
            kind="cta"
            label="Sign In"
            onClick={ this.simulateActivate } />
        </div>
      </div>
    )
  }
})
