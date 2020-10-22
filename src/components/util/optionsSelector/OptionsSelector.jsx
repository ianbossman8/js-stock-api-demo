import React from 'react'
import { Radio } from 'antd'
import './optionsSelector.css'

function OptionsSelector(props) {
  const { selectedValue, setValue, options } = props

  function handleRadioChange(event) {
    setValue(event.target.value)
  }

  return (
    <Radio.Group onChange={handleRadioChange} value={selectedValue} className="radio-options-selector">
      {options.map((option) => (
        <Radio key={option.value} value={option.value}>
          {option.display}
        </Radio>
      ))}
    </Radio.Group>
  )
}

export default OptionsSelector
