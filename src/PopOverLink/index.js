import React from 'react'
import check from '../check.png'
import './style.scss'

export default () => (
  <div className="PopOverLink">
    <div className="PopOverLink__content">
      <img src={ check } alt="voided check" />
    </div>
    <span className="PopOverLink__text">View an example voided check.</span>
  </div>
)
