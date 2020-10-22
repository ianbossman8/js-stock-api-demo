import React, { useMemo } from 'react'
import { Line } from '@ant-design/charts'

function LineChart(props) {
  const { data } = props

  const memoData = useMemo(() => data, [data])

  const config = {
    data: memoData,
    padding: 'auto',
    height: 400,
    xField: 'date',
    yField: 'price',
    xAxis: { type: 'time' },
    seriesField: 'name',
    legend: { position: 'top' },
  }

  return (
    <div className="stock-chart-container">
      <Line {...config} />
    </div>
  )
}

export default LineChart
