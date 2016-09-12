import React from 'react'
import { delay } from 'lodash'
import { browserHistory } from 'react-router'
import classNames from 'classnames'
import './Registration.scss'

// hero-ui SASS
import 'hero-ui/assets.scss'

// hero-ui components
import Button from 'hero-ui/buttons/Button'
import Fieldset from 'hero-ui/forms/Fieldset'
import FormRow from 'hero-ui/forms/FormRow'
import TextInput from 'hero-ui/forms/TextInput'
import SearchInput from 'hero-ui/forms/SearchInput'
import Icon from 'hero-ui/atoms/Icon'
import AddressLookup from 'hero-ui/forms/AddressFieldsetWithLookup'
import FileInput from 'hero-ui/forms/FileInput'

// Other components
import FormIntro from './FormIntro'
import RadioGroup from './RadioGroup'
import PopOverLink from './PopOverLink'
import SearchResult from './SearchResult'

const filepicker = global.filepicker
filepicker.setKey("Aq0Ib82uTPOXbCwzos1m0z")

export default React.createClass({
  getInitialState() {
    return {
      loading: false,
      complete: false,
      notFound: false,
      einConfirmed: false,
      ein: '',
      einErrors: [],
      displayName: 'Animal Foundation Pty. Ltd.',
      contactNumber: '',
      routingNumber: '',
      accountNumber: '',
      imageName: '',
      subscription: 'STARTER (FREE)',
      payment: 'Wire Transfer (ACH) or Check'
    }
  },

  handleEINBlur(text) {
    if (text.length && text.length < 9) {
      this.setState({
        einErrors: ['Heads up! This EIN looks incomplete. A valid EIN is nine digits long, for example 123456789']
      })
    }
  },

  simulateLoading() {
    // set state to loading
    this.setState({
      loading: true,
      complete: false
    })

    // after a few seconds, set it to complete
    delay(() => {
      this.setState({
        loading: false,
        complete: true
      })
    }, 3300)
  },

  handleEINChange(text) {
    const strippedText = text.replace(/[a-z]/gi, '')

    this.setState({ ein: strippedText })

    if (strippedText.length >= 9) {
      this.setState({ einErrors: [] })
    }
  },

  handleEINSearch(e) {
    e.preventDefault()
    if (this.state.ein.length >= 9) this.simulateLoading()
  },

  handleInputChange(key, text) {
    this.setState({
      [key]: text
    })
  },

  simulateSendForm() {
    browserHistory.push(`/thankyou?email=${this.props.location.query.email}`)
  },

  simulateUploaded() {
    this.setState({
      imageName: 'voided_check_0012_scan.jpg'
    })
  },

  handleSubscriptionChange(value) {
    this.setState({
      subscription: value
    })
  },

  handlePaymentChange(value) {
    this.setState({
      payment: value
    })
  },

  renderPaymentSection() {
    return (
      <Fieldset legend="Payment">
        <FormRow>
          <RadioGroup
            labels={[
              {
                value: 'Wire Transfer (ACH) or Check',
                tip: 'Invoiced annually at a total of $1,188.00'
              },
              {
                value: 'Annual Direct Debit',
                tip: 'Invoiced annually at a total of $1,188.00'
              },
              {
                value: 'Monthly Direct Debit',
                tip: 'Invoiced monthly at a total of $99.00'
              }
            ]}
            name="invoice"
            onChange={ this.handlePaymentChange }
            value={ this.state.payment } />

          <div className="hui-FormRow__tip">
            <label className="hui-FormRow__label">
              <p>Upon sending your application you will recieve your first invoice via email. Pay using the preffered method for your organization.</p>
            </label>
          </div>
        </FormRow>
      </Fieldset>
    )
  },

  renderFullForm() {
    const {
      loading,
      complete
    } = this.state

    const classes = classNames({
      FullForm: true,
      hidden: !loading && !complete,
      loading: loading,
      complete: complete
    })

    return (
      <form className={ classes }>
        <div className="FullForm__title">
          Please double check the details below and tell us a little bit more to complete your application.
        </div>

        <Fieldset legend="Organization Name">
        { this.state.notFound && <FormRow tip="This is your legal organization name as registered with the IRS for the EIN provided above. This will be included on donation along with your display name.">
          <TextInput
            layout="half"
            label="Organization Name"
            onChange={ (text) => this.handleInputChange('displayName', text) }
            value={ this.state.displayName }
            errorMessage="This field is required. Hint: An EIN is also known as a Federal Tax Identification number."
            required
            showError />
        </FormRow> }

          <FormRow tip="The organization display name appears publically on your everydayhero nonprofit profile, campaign pages, donation receipts and in search results. Choose a name that your donors and fundraisers will recognize.">
            <TextInput
              layout="half"
              label="Organization Display Name"
              onChange={ (text) => this.handleInputChange('displayName', text) }
              value={ this.state.displayName }
              errorMessage="This field is required. Hint: An EIN is also known as a Federal Tax Identification number."
              required
              showError />
          </FormRow>
        </Fieldset>

        <Fieldset legend="Your Contact Number">
          <FormRow tip="This phone number is used by everydayhero staff to contact you should we need any further details during the application process or in the event of any billing or legal matters.">
            <TextInput
              layout="half"
              label="Your Contact Number"
              hint="Ideally this should be your direct contact number, rather than a general number for you organization."
              onChange={ (text) => this.handleInputChange('contactNumber', text) }
              value={ this.state.contactNumber }
              required />
          </FormRow>
        </Fieldset>

        <Fieldset legend="Postal Address">
          <FormRow tip="We use this address only if we need to send your organization physical financial or legal documents relating to your account at everydayhero.">
            <AddressLookup
              prefill={{
                street_address: '742 Evergreen Terrace',
                extended_address: '',
                locality: 'Springfield',
                region: 'Oregon',
                country_name: 'United States',
                postal_code: '10259'
              }}
              required
              showError />
          </FormRow>
        </Fieldset>

        <Fieldset legend="Bank Account Details">
          <FormRow tip="We use these bank account details to release donations to your nonprofit. Funds are released via bank-to-bank transfer, once a week.">
          <TextInput
            layout="half"
            label="Routing Number"
            hint="A bank routing number is a nine digit code based on the bank location where your account was opened."
            onChange={ (text) => this.handleInputChange('routingNumber', text) }
            value={ this.state.routingNumber }
            required />
          </FormRow>
          <FormRow>
            <TextInput
              layout="half"
              label="Account Number"
              onChange={ (text) => this.handleInputChange('accountNumber', text) }
              value={ this.state.accountNumber }
              required />
            <div className="hui-FormRow__tip">
              <label className="hui-FormRow__label">
                <p>To avoid fraud and comply with federal regulations we verify your banking information before depositing any funds.</p>

                <p>
                  <a href="https://nfp.help-us.everydayhero.com/hc/en-us/articles/202545528-Why-do-you-need-our-banking-information-" target="_blank">
                    <Icon icon="external-link" /> Why do we need your banking information?
                  </a>
                </p>
                <p>
                  <a href="https://nfp.help-us.everydayhero.com/hc/en-us/articles/202198128-What-is-involved-in-everydayhero-s-compliance-process-" target="_blank">
                    <Icon icon="external-link" /> What type of compliance review does Blackbaud and everydayhero do?
                  </a>
                </p>
              </label>
            </div>
          </FormRow>
          <br />
          <br />
          <FormRow>
            <FileInput
              label="Voided Check Upload"
              onChange={ this.simulateUploaded }
              value={{ filename: this.state.imageName }}
              layout="half" />

            <div className="hui-FormRow__tip">
              <label className="hui-FormRow__label">
                <p>Upload a voided check OR a bank statement (in .pdf, .jpg, .png or .gif format) showing the name of your organization’s account number. We use this to verify that the above bank account is in the name of your organization.</p>

                <PopOverLink />
              </label>
            </div>
          </FormRow>
        </Fieldset>

        <Fieldset legend="Subscription">
          <FormRow>
            <RadioGroup
              labels={[
                {
                  value: 'STARTER (FREE)',
                  tip: 'Detailed donor and fundraiser reports, an everydayhero charity profile, donor cover, The Raiser’s Edge integration and more...'
                },
                {
                  value: 'PRO ($99/mo)',
                  tip: 'Create branded single chartity events, branded campaign landing-pages and access a dedicated account manager.'
                }
              ]}
              name="subscription"
              onChange={ this.handleSubscriptionChange }
              value={ this.state.subscription } />

            <div className="hui-FormRow__tip">
              <label className="hui-FormRow__label">
                <p>Every nonprofit is different. Choose the subscription and features that suit your organization best to get started on the right foot.</p>

                <p>Still not sure? No problem, check out a full comparison of Starter vs. Pro to find what’s best for you.</p>
              </label>
            </div>
          </FormRow>
        </Fieldset>

        { this.state.subscription === 'PRO ($99/mo)' && this.renderPaymentSection() }

        <Button
          label="Send Application"
          kind="cta"
          onClick={ this.simulateSendForm }
          disabled={ !this.state.complete } />
      </form>
    )
  },

  render() {
    return (
      <section className="mainFormSection">
        <div>
          <FormIntro />

          <form onSubmit={ (e) => this.handleEINSearch(e) }>
            <Fieldset legend="Employer Identification Number (EIN)">
              <FormRow tip="Enter the Employee Identification Number (EIN) for your organization to automatically indentify your your nonprofit.">
                { this.state.loading && <Icon className="LoadingIcon" icon="refresh" spin /> }
                <SearchInput
                  layout="half"
                  label="EIN"
                  autoFocus={ true }
                  hint="Hint: A valid EIN is nine digits long, for example 123456789"
                  onChange={ (text) => this.handleEINChange(text) }
                  onBlur={ (text) => this.handleEINBlur(text) }
                  value={ this.state.ein }
                  errors={ this.state.einErrors }
                  required />
              </FormRow>

              <SearchResult
                loading={ this.state.loading }
                complete={ this.state.complete } />
            </Fieldset>
          </form>

          { this.renderFullForm() }
        </div>
      </section>
    )
  }
})
