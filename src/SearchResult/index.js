import React from 'react'
import classNames from 'classnames'
import Icon from 'hero-ui/atoms/Icon'
import PopOverLink from '../PopOverLink'
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
            <div className="SearchResult__orgName">Animal Foundation Pty. Ltd.</div>
            <p>742 Evergreen Terrace, Springfield<br />
            OREGON, United States, 81321</p>
            <PopOverLink text="This doesn't look right?">
              <p>What do we write here?</p>
            </PopOverLink>
          </div>
        </div> }
      </div>
    </div>
  )
}
