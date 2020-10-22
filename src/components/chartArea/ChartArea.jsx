import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import DateTime from 'luxon/src/datetime.js'
import { graphOptions } from '../../constant'
import LineChart from '../util/lineChart/LineChart'
import OptionsSelector from '../util/optionsSelector/OptionsSelector'
import './chartArea.css'

function mapStateToProps(state) {
  return {
    priceData: state.stockPrices,
  }
}

function transformData(priceData, selectedPriceType) {
  return new Promise((resolve) => {
    let arr = []

    for (const sym in priceData) {
      if (sym !== 'error') {
        let tempValue = []

        priceData[sym] &&
          priceData[sym][selectedPriceType].map(
            (price, i) =>
              (tempValue = [
                ...tempValue,
                {
                  name: sym,
                  price: Math.round(price * 100) / 100,
                  date: DateTime.fromSeconds(priceData[sym].t[i]).toISODate(),
                },
              ])
          )

        arr = [...arr, ...tempValue]
      }
    }

    resolve(arr)
  })
}

function ChartArea(props) {
  const { priceData } = props

  const [dataForRender, setDataForRender] = useState([])
  const [selectedPriceType, setPriceType] = useState(graphOptions.priceTypes[0].value)

  useEffect(() => {
    transformData(priceData, selectedPriceType).then((formattedData) => setDataForRender(formattedData))
  }, [priceData, selectedPriceType])

  return (
    <div className="chart-area">
      <OptionsSelector options={graphOptions.priceTypes} selectedValue={selectedPriceType} setValue={setPriceType} />
      <LineChart data={dataForRender} />
    </div>
  )
}

export { ChartArea }
export default connect(mapStateToProps)(ChartArea)
