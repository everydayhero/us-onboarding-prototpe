import React from 'react'
import Icon from 'hero-ui/atoms/Icon'
import classNames from 'classnames'
import './style.scss'

export default ({ complete, loading }) => {
  const classes = classNames({
    'SearchResult': true,
    'SearchResult--visible': complete,
    'SearchResult--loading': loading
  })

  return (
    <div className={ classes }>
      <div className="SearchResult__icon">
        <Icon icon="check" />
      </div>
      <div className="SearchResult__content">
        <div className="SearchResult__heading">We've identified your organization!
        </div>
        <div className="SearchResult__org">
          <div className="SearchResult__orgName">Animal Foundation Pty. Ltd.</div>
          <p>742 Evergreen Terrace, Springfield<br />
          OREGON, United States, 81321</p>
        </div>
      </div>
    </div>
  )
}
