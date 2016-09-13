import React from 'react'
import './style.scss'

export default ({ text, children }) => (
  <div className="PopOverLink">
    <div className="PopOverLink__content">
      { children }
    </div>
    <span className="PopOverLink__text">{ text }</span>
  </div>
)
