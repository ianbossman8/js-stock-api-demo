import { GET_STOCK_PRICES, REMOVE_STOCK_SYMBOL, GET_STOCK_PRICES_ERROR } from '../actions/stockPricesActions'

export const initialState = {
  error: '',
}

export default function stockSymbolsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STOCK_PRICES:
      return {
        ...state,
        [action.symbol]: action.priceData,
      }

    case REMOVE_STOCK_SYMBOL:
      let newState = {}

      for (const symbol in state) {
        if (symbol === action.symbol) {
          continue
        }

        newState = {
          ...newState,
          [symbol]: state[symbol],
        }
      }

      return newState

    case GET_STOCK_PRICES_ERROR:
      return {
        ...state,
        error: `${action.symbol} ${action.error}`,
      }
    default:
      return state
  }
}
