import React from 'react'
import classNames from 'classnames'
import Icon from 'hero-ui/atoms/Icon'
import './style.scss'

export default ({ complete, loading, notFound }) => {
  const classes = classNames({
    'SearchResult': true,
    'SearchResult--visible': complete,
    'SearchResult--loading': loading,
    'SearchResult--notFound': notFound
  })

  const heading = loading ? 'Searching for your organization... This will only take a moment.' : 'We\'ve identified your organization and pre-filled your application!'

  const notFoundHeading = 'Sorry, we couldn\'t pre-fill your application.'

  const subheading = notFound ? 'We couldn\'t find your EIN in our system, but that\'s okay. Tell us about your organization to complete your application.' : 'Double check the details below and tell us a bit more to complete your application.'

  return (
    <div className={ classes }>
      <div className="SearchResult__content">
        <div className="SearchResult__heading">
          { notFound ? notFoundHeading : heading }
        </div>
        <div className="SearchResult__subheading">
          { subheading }
        </div>
        { !notFound && <div className="SearchResult__orgContainer">
          <div className="SearchResult__icon">
            <Icon icon={ notFound ? 'question' : 'check' } />
          </div>
          <div className="SearchResult__org">
            <div className="SearchResult__orgName">
              Second Harvest Foodbank of Southern Wisconsin
            </div>
            <p>2802 Dairy Dr<br />
            Madison, Wisconsin, 53718, United States</p>
          </div>
        </div> }
      </div>
    </div>
  )
}
