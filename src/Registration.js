import React from 'react'
import { delay } from 'lodash'
import { hashHistory } from 'react-router'
import classNames from 'classnames'
import './Registration.scss'
import check from './check.png'

// hero-ui SASS
import 'hero-ui/assets.scss'

// hero-ui components
import Button from 'hero-ui/buttons/Button'
import Fieldset from 'hero-ui/forms/Fieldset'
import FormRow from 'hero-ui/forms/FormRow'
import TextInput from 'hero-ui/forms/TextInput'
import SearchInput from 'hero-ui/forms/SearchInput'
import Checkbox from 'hero-ui/forms/Checkbox'
import AddressLookup from 'hero-ui/forms/AddressFieldsetWithLookup'
import FileInput from 'hero-ui/forms/FileInput'
import Icon from 'hero-ui/atoms/Icon'

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
      orgName: '',
      notFound: false,
      samePostal: true,
      einConfirmed: false,
      ein: '',
      einErrors: [],
      displayName: 'Concern Foundation',
      fullName: '',
      emailAddress: '',
      contactNumber: '',
      routingNumber: '',
      accountNumber: '',
      imageName: '',
      subscription: 'STARTER (FREE)',
      payment: 'Wire Transfer (ACH) or Check',
      termsCheckbox: false,
      sendButtonClicked: false
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
      complete: false,
      notFound: false
    })

    // after a few seconds, set it to complete
    delay(() => {
      this.setState({
        loading: false,
        complete: true
      })

      if (this.state.ein === '000999888') {
        this.setState({
          displayName: '',
          notFound: true
        })
      }
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
    this.setState({ sendButtonClicked: true })

    const {
      complete,
      ein,
      displayName,
      contactNumber,
      routingNumber,
      accountNumber,
      imageName,
      termsCheckbox
    } = this.state

    const formCompleted = complete && ein && displayName && contactNumber && routingNumber && accountNumber && imageName && termsCheckbox

    if (formCompleted) {
      hashHistory.push(`/thankyou?email=${this.props.location.query.email}`)
    }
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

  handleSamePostalCheckbox() {
    this.setState({ samePostal: !this.state.samePostal })
  },

  handleTermsCheckbox() {
    this.setState({ termsCheckbox: !this.state.termsCheckbox })
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

  renderTermsCheckbox() {
    const checkboxLabel = <span>I accept the everydayhero <a href="#">online fundraising agreement</a></span>

    return (
      <Fieldset>
        <FormRow>
          <Checkbox
            className="TermsCheckbox"
            labelIsClickable={ false }
            label={ checkboxLabel }
            value={ this.state.termsCheckbox }
            onChange={ this.handleTermsCheckbox } />
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
          <SearchResult
            notFound={ this.state.notFound }
            loading={ this.state.loading }
            complete={ this.state.complete } />
        </div>

        <Fieldset legend="Organization Name">
          { this.state.notFound && <FormRow tip="This is your legal organization name as registered with the IRS for the EIN provided above. This will be included on donation along with your display name.">
            <TextInput
              layout="half"
              label="Organization Name"
              onChange={ (text) => this.handleInputChange('orgName', text) }
              value={ this.state.orgName }
              errorMessage="This field is required. It should match the name your organization has registered with the IRS."
              required />
          </FormRow> }

          <FormRow tip="The organization display name appears publically on your everydayhero nonprofit profile, campaign pages, donation receipts and in search results. Choose a name that your donors and fundraisers will recognize.">
            <TextInput
              layout="half"
              label="Organization Display Name"
              onChange={ (text) => this.handleInputChange('displayName', text) }
              value={ this.state.displayName }
              errorMessage="This field is required. Hint: An EIN is also known as a Federal Tax Identification number."
              required />
          </FormRow>
        </Fieldset>

        { this.state.notFound && <Fieldset legend="Organization Address">
          <FormRow tip="We verify that this is your organization's address as registered with the IRS.">
            <AddressLookup
              countryCode="us"
              required
              errorMessage="This field is required. It should match the address your organization has registered with the IRS." />
          </FormRow>
          <FormRow>
            <Checkbox
              labelIsClickable={ false }
              label="This is also the postal address for my organization"
              value={ this.state.samePostal }
              onChange={ this.handleSamePostalCheckbox } />
          </FormRow>
        </Fieldset> }

        { !this.state.samePostal && <Fieldset legend="Postal Address">
          <FormRow tip="We use this address only if we need to send your organization financial or legal documents relating to your account at everydayhero.">
            <AddressLookup countryCode="us" />
          </FormRow>
        </Fieldset> }

        { !this.state.notFound && <Fieldset legend="Postal Address">
          <FormRow tip="We use this address only if we need to send your organization financial or legal documents relating to your account at everydayhero.">
            <AddressLookup
              prefill={{
                street_address: '11111 West Olympic Boulevard, Suite 214',
                extended_address: '',
                locality: 'Los Angeles',
                region: 'California',
                country_name: 'United States',
                postal_code: '90064'
              }}
              required />
          </FormRow>
        </Fieldset> }

        <Fieldset legend="Deposit Bank Account Details">
          <FormRow tip="We use these bank account details only to deposit donations to your nonprofit. Funds are deposited via bank-to-bank transfer, once a week.">
          <TextInput
            layout="half"
            label="Routing Number"
            hint="A bank routing number is a nine digit code based on the bank location where your account was opened."
            onChange={ (text) => this.handleInputChange('routingNumber', text) }
            value={ this.state.routingNumber }
            errorMessage="A routing number is required before donations can be released to your account."
            showError={ this.state.sendButtonClicked }
            required />
          </FormRow>
          <FormRow>
            <TextInput
              layout="half"
              label="Account Number"
              onChange={ (text) => this.handleInputChange('accountNumber', text) }
              value={ this.state.accountNumber }
              errorMessage="A bank account number is required before donations can be released to your account."
              showError={ this.state.sendButtonClicked }
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
              layout="half"
              required={ true }
              showError={ this.state.sendButtonClicked }
              errors={ this.state.sendButtonClicked && !this.state.imageName && ['This field is required.'] } />

            <div className="hui-FormRow__tip">
              <label className="hui-FormRow__label">
                <p>Upload a voided check OR a bank statement (in .pdf, .jpg, .png or .gif format) showing the name of your organization’s account number. We use this to verify that the above bank account is in the name of your organization.</p>

                <PopOverLink text="View an example voided check.">
                  <img src={ check } alt="voided check" />
                </PopOverLink>
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

                <p>Still not sure? No problem, check out a <a href="http://join.everydayhero.com/us/#benefits" target="_blank">full comparison of Starter vs. Pro</a> to find what’s best for you.</p>
              </label>
            </div>
          </FormRow>
        </Fieldset>

        { this.state.subscription === 'PRO ($99/mo)' && this.renderPaymentSection() }
        { this.renderTermsCheckbox() }

        <Button
          label="Send Application"
          kind="cta"
          onClick={ this.simulateSendForm } />
      </form>
    )
  },

  render() {
    console.log(this.state.sendButtonClicked)

    return (
      <section className="mainFormSection">
        <div>
          <FormIntro />

          <form onSubmit={ (e) => this.handleEINSearch(e) }>
          <Fieldset legend="Your Information">
            <FormRow>
              <TextInput
                layout="half"
                label="Your Full Name"
                hint="Providing your full name helps speed up the verification process."
                onChange={ (text) => this.handleInputChange('fullName', text) }
                value={ this.state.fullName }
                errorMessage="This field is required."
                showError={ this.state.sendButtonClicked }
                required />
            </FormRow>

            <FormRow tip="We will contact you via this email address if we need any additional information regarding your application.">
              <TextInput
                layout="half"
                label="Your Email Address"
                onChange={ (text) => this.handleInputChange('emailAddress', text) }
                value={ this.state.emailAddress }
                errorMessage="This field is required."
                showError={ this.state.sendButtonClicked }
                required />
            </FormRow>

            <FormRow tip="In instances where we can't reach you via email we will use your contact number.">
              <TextInput
                layout="half"
                label="Your Contact Number"
                hint="Ideally this should be your direct contact number, rather than a general number for you organization."
                onChange={ (text) => this.handleInputChange('contactNumber', text) }
                value={ this.state.contactNumber }
                errorMessage="This field is required."
                showError={ this.state.sendButtonClicked }
                required />
            </FormRow>
          </Fieldset>

            <Fieldset legend="Employer Identification Number (EIN)">
              <FormRow tip="Enter the Employee Identification Number (EIN) for your organization to automatically indentify your your nonprofit.">
                { this.state.loading && <Icon className="LoadingIcon" icon="refresh" spin /> }
                <SearchInput
                  layout="half"
                  label="EIN"
                  hint="Hint: A valid EIN is nine digits long, for example 123456789"
                  onChange={ (text) => this.handleEINChange(text) }
                  onBlur={ (text) => this.handleEINBlur(text) }
                  value={ this.state.ein }
                  errors={ this.state.einErrors }
                  showError={ this.state.sendButtonClicked }
                  disabled={ this.state.loading }
                  required />
              </FormRow>
            </Fieldset>
          </form>

          { this.renderFullForm() }
        </div>
      </section>
    )
  }
})
