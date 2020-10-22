import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { graphOptions } from './constant'
import getStockPrices, { removeStockSymbol } from './actions/stockPricesActions'
import StockSelect from './components/stockSelect/StockSelect'
import OptionsSelector from './components/util/optionsSelector/OptionsSelector'
import TimeframeSelect from './components/timeframeSelect/TimeframeSelect'
import ChartArea from './components/chartArea/ChartArea'
import './app.css'

function mapStateToProps(state) {
  return {
    symbols: state.stockSymbols,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchStockPrices: function (selectedSyms, ...args) {
      return dispatch(getStockPrices(selectedSyms, ...args))
    },
    removeStockPrices: function (sym) {
      return dispatch(removeStockSymbol(sym))
    },
  }
}

function App(props) {
  const { fetchStockPrices, removeStockPrices, symbols } = props

  const [selectedSyms, setSym] = useState([])
  const [selectedTimeframe, setSelectedTimeframe] = useState([])
  const [selectedResolution, setResolution] = useState('')
  const [aboutController, setAbortObj] = useState({})

  useEffect(() => {
    if (selectedSyms.length !== 0 && selectedTimeframe.length === 2 && selectedResolution) {
      fetchStockPrices(selectedSyms, selectedResolution, selectedTimeframe).then((aboutObj) => setAbortObj(aboutObj))
    }
  }, [selectedSyms, selectedTimeframe, selectedResolution, fetchStockPrices, setAbortObj])

  function setSymbols(symbol) {
    return setSym((sym) => [...sym, symbol])
  }

  function removeSymbol(symbol) {
    if (typeof aboutController[symbol] !== 'undefined') {
      aboutController[symbol].controller.abort()
    }

    removeStockPrices(symbol)

    return setSym((sym) => {
      const cloneArray = sym.slice()
      cloneArray.splice(cloneArray.indexOf(symbol), 1)

      return cloneArray
    })
  }

  return (
    <div className="app-container">
      <form className="app-form">
        <StockSelect
          symbols={symbols}
          setSymbols={setSymbols}
          removeSymbol={removeSymbol}
          selectedSyms={selectedSyms}
        />
        <TimeframeSelect setSelectedTimeframe={setSelectedTimeframe} />
        <OptionsSelector
          options={graphOptions.resolution}
          selectedValue={selectedResolution}
          setValue={setResolution}
        />
      </form>
      <ChartArea />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
