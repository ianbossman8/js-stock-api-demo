import reducer, { initialState } from './stockSymbols'
import { getStockSymbolErrorAction, getStockSymbolsAction } from '../actions/stocksSymbolsActions'

describe('stockSymbols reducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({ error: '', symbols: {} })
  })

  test('should handle GET_STOCK_SYMBOLS_ERROR', () => {
    const action = getStockSymbolErrorAction('error')

    expect(reducer(initialState, action)).toEqual({ error: 'error', symbols: {} })
  })

  test('should handle GET_STOCK_SYMBOLS', () => {
    const symbolsObj = {
      A: [{ value: 'AA', label: 'AA - AA Corp' }],
    }
    const action = getStockSymbolsAction(symbolsObj)

    expect(reducer(initialState, action)).toEqual({ error: '', symbols: symbolsObj })
  })
})
