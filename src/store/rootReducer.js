import { combineReducers } from 'redux'
import stockPrices from '../reducers/stockPrices'
import stockSymbols from '../reducers/stockSymbols'

export default combineReducers({ stockPrices, stockSymbols })
