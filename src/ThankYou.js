import React from 'react'
import sending from './sending.png'
import './ThankYou.scss'

export default () => {
  return (
    <div className="ThankYou">
      <div className="ThankYou__content">
        <img src={ sending } alt="sending" />

        <div className="ThankYou__title">Thank You</div>
        <p className="ThankYou__subtitle">Your application has been submitted and we have sent you a confirmation email for your records.</p>

        <p>Because we're serious about compliance, we'll verify your details before finalising your application and activating your everydayhero account. This process takes 2-3 business days.</p>

        <p>We'll contact you as soon as this is complete. If you need to speak with us in the meantime, please call us on 01-4372200.</p>

        <p>The team at everydayhero</p>
      </div>
    </div>
  )
}
