import React from 'react'
import Footer from 'hero-ui/layout/Footer'
import MenuBar from './MenuBar'
import { has } from 'lodash'

import './App.scss'
import 'hero-ui/assets.scss'

export default React.createClass({
  getInitialState() {
    return {
      email: ''
    }
  },

  render() {
    const email = has(this.props, 'location.query.email') ? this.props.location.query.email : ''

    return (
      <div className="App">
        <MenuBar email={ email } />
        { this.props.children }
        <Footer />
      </div>
    )
  }
})
