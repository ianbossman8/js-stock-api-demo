import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import reducers from './rootReducer'
import { apiKey } from '../constant'

const rootUrl = 'https://finnhub.io/api/v1/stock'

export const api = {
  getStocksSymbols: rootUrl + '/symbol?exchange=US&token=' + apiKey,
  getStockPrices: function (symbol, resolution, from, to) {
    return rootUrl + `/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${apiKey}`
  },
}

export default createStore(reducers, applyMiddleware(thunk.withExtraArgument(api)))
