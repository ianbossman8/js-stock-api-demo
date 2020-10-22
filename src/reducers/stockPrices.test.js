import reducer, { initialState } from './stockPrices'
import { getStockPricesAction, getStockPricesErrorAction, removeStockSymbol } from '../actions/stockPricesActions'

describe('stockPrices reducer', () => {
  const symbol = 'A'
  const priceData = {
    c: [217.68, 221.03, 219.89],
    h: [222.49, 221.5, 220.94],
    l: [217.19, 217.1402, 218.83],
    o: [221.03, 218.55, 220],
    s: 'ok',
    t: [1569297600, 1569384000, 1569470400],
    v: [33463820, 24018876, 20730608],
  }

  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({ error: '' })
  })

  test('should handle GET_STOCK_PRICES', () => {
    const action = getStockPricesAction(symbol, priceData)

    expect(reducer(initialState, action)).toEqual({ error: '', [symbol]: priceData })
  })

  test('should handle GET_STOCK_PRICES_ERROR', () => {
    const action = getStockPricesErrorAction('error', symbol)

    expect(reducer(initialState, action)).toEqual({ error: `${symbol} error` })
  })

  test('should handle REMOVE_STOCK_SYMBOL', () => {
    const state = {
      error: '',
      [symbol]: priceData,
    }

    const action = removeStockSymbol(symbol)

    expect(reducer(state, action)).toEqual({ error: '' })
  })
})
