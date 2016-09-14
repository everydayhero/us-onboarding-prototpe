import React from 'react'
import Footer from 'hero-ui/layout/Footer'
import MenuBar from './MenuBar'

import './App.scss'
import 'hero-ui/assets.scss'

export default React.createClass({
  getInitialState() {
    return {
      email: ''
    }
  },

  render() {
    return (
      <div className="App">
        <MenuBar />
        { this.props.children }
        <Footer region="us" imagePath="https://qludn19a1ws1wby8q1l5qshc-wpengine.netdna-ssl.com/us/wp-content/themes/edh-portal-2014/assets/img/edh-logo.png?1395271134" />
      </div>
    )
  }
})
