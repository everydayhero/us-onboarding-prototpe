import React from 'react'
import TextInput from 'hero-ui/forms/TextInput'
import Checkbox from 'hero-ui/forms/Checkbox'
import Button from 'hero-ui/buttons/Button'
import Icon from 'hero-ui/atoms/Icon'

import { browserHistory } from 'react-router'

import './SignUp.scss'
import QuoteIcon from './quote_icon.png'

export default React.createClass({
  getInitialState() {
    return {
      name: '',
      email: '',
      password: '',
      terms: false
    }
  },

  handleTextInputChange(key, text) {
    this.setState({ [key]: text })
  },

  handleCheckbox() {
    this.setState({
      terms: !this.state.terms
    })
  },

  simulateSignUp(e = null) {
    if (e) e.preventDefault()
    browserHistory.push(`/registration?email=${this.state.email}`)
  },

  render() {
    const { name, email, password, terms } = this.state
    const checkboxLabel = <span>I agree to everydayhero's <a href='https://everydayhero.com/us/terms/privacy' target='_blank'>Privacy Policy</a> and <a href='/admin/us/terms/' target='_blank'>Terms & Conditions</a></span>

    return (
      <section className="SignUp">
        <form className="SignUpForm" onSubmit={ (e) => this.simulateSignUp(e) }>
          <div className="SignUpForm__title">SIGN UP</div>
          <Icon className="SignUpForm__icon" icon="heart-o" />
          <hr />

          <div className="SignUpForm__fields">
            <TextInput
              label="Name"
              onChange={ (text) => this.handleTextInputChange('name', text) }
              value={ this.state.name }
              errorMessage="This field is required."
              required />
            <TextInput
              label="Email"
              type="email"
              onChange={ (text) => this.handleTextInputChange('email', text) }
              value={ this.state.email }
              errorMessage="This field is required."
              required />
            <TextInput
              label="Password"
              onChange={ (text) => this.handleTextInputChange('password', text) }
              value={ this.state.password }
              errorMessage="This field is required."
              type="password"
              required />
            <div>
              <Checkbox
                labelIsClickable={ false }
                label={ checkboxLabel }
                value={ terms }
                onChange={ this.handleCheckbox }
                errorMessage="This field is required."
                required />
            </div>
            <Button
              label="Sign Up"
              kind="cta"
              type="submit"
              disabled={ !email || !password || !name || !terms } />
          </div>
        </form>

        <div className="Quote">
          <div>&ldquo;everydayhero provides an amazing service and their technology is continually evolving and updating to meet the needs of its users. We see a large increase in amounts raised by our community fundraisers when they choose to fundraise online using everydayhero's platform.&rdquo;</div>
          <div className="Quote__owner">
            <img src={ QuoteIcon } alt="Quote" /> Samantha Ramsden, Stroke Foundation Australia
          </div>
        </div>
      </section>
    )
  }
})
