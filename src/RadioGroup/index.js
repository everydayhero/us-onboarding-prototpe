import React from 'react'
import classNames from 'classnames'
import './style.scss'

export default ({ labels, onChange, name, value }) => {
  const radios = labels.map((label, i) => {
    const classes = classNames({
      'RadioInput': true,
      'RadioInput--selected': value === label.value
    })

    return (
      <label className={ classes } key={ `${name}-${i}` }>
        <input
          type="radio"
          name={ name }
          label={ label.value }
          value={ label.value }
          onChange={ onChange.bind(null, label.value) }
          checked={ value === label.value } />
        { label.value }
        <div className="RadioInput__tip">
          { label.tip }
        </div>
      </label>
    )
  })

  return <div className="RadioGroup">{ radios }</div>
}
