import { GET_STOCK_SYMBOLS, GET_STOCK_SYMBOLS_ERROR } from '../actions/stocksSymbolsActions'

export const initialState = {
  error: '',
  symbols: {},
}

export default function stockSymbolsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STOCK_SYMBOLS:
      return {
        error: '',
        symbols: action.symbols,
      }
    case GET_STOCK_SYMBOLS_ERROR:
      return {
        ...initialState,
        error: action.error,
      }
    default:
      return state
  }
}
