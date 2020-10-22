import React from 'react'
import DateTime from 'luxon/src/datetime.js'
import { DatePicker } from 'antd'
import './timeframeSelect.css'

const { RangePicker } = DatePicker

function TimeframeSelect(props) {
  const { setSelectedTimeframe } = props

  function disabledDate(current) {
    return current && current.utc() > DateTime.utc()
  }

  function handleChange(values) {
    if (values) {
      setSelectedTimeframe([values[0].unix(), values[1].unix()])
    }
  }

  return <RangePicker onChange={handleChange} disabledDate={disabledDate} />
}

export { TimeframeSelect }
export default TimeframeSelect
