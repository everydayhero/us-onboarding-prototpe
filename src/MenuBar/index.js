import React from 'react'
import './style.scss'

export default ({ email = null }) => {
  return (
    <div className="MenuBar">
      <div className="MenuBar__img">
        <img src="https://nfp.everydayhero-staging.com/admin/images/Partials/TopBar/EDH-Logo-191x34-full-green.6f4550aa.png" alt="everydayhero" />
      </div>

      <div className="MenuBar__user">
        { email && <span className="MenuBar__email">{ email }</span> }
        <span className="MenuBar__signedIn">
          <a href="/">{ email ? 'Sign out' : 'Sign in' }</a>
        </span>
      </div>
    </div>
  )
}
