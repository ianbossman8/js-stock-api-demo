export const GET_STOCK_PRICES = 'GET_STOCK_PRICES'
export const GET_STOCK_PRICES_ERROR = 'GET_STOCK_PRICES_ERROR'
export const REMOVE_STOCK_SYMBOL = 'REMOVE_STOCK_SYMBOL'

export function getStockPricesAction(symbol, priceData) {
  return {
    type: GET_STOCK_PRICES,
    symbol,
    priceData,
  }
}

export function getStockPricesErrorAction(error, symbol) {
  return {
    type: GET_STOCK_PRICES_ERROR,
    symbol,
    error,
  }
}

export async function fetchData(symbol, getStockPrices, signal, ...args) {
  const [resolution, timeframe] = args

  try {
    const response = await fetch(getStockPrices(symbol, resolution, timeframe[0], timeframe[1]), { signal })

    if (response.ok) {
      const parsedRes = await response.json()

      if (parsedRes.s === 'ok') {
        return function (dispatch) {
          dispatch(getStockPricesAction(symbol, parsedRes))
        }
      }

      throw new Error('price error')
    }
  } catch (error) {
    throw error
  }
}

export default function getStockData(symbols, ...args) {
  return async function (dispatch, _, api) {
    try {
      let controller
      let abortObj = {}

      for (let symbol of symbols) {
        controller = new AbortController()
        const { signal } = controller

        abortObj = {
          ...abortObj,
          [symbol]: {
            controller,
          },
        }

        fetchData(symbol, api.getStockPrices, signal, ...args)
          .then((func) => func(dispatch))
          .catch((error) => {
            return dispatch(getStockPricesErrorAction(error.message, symbol))
          })
      }

      return abortObj
    } catch (error) {
      dispatch(getStockPricesErrorAction(error.message))
    }
  }
}

export function removeStockSymbol(symbol) {
  return {
    type: REMOVE_STOCK_SYMBOL,
    symbol,
  }
}
