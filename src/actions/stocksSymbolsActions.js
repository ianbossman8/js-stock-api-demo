export const GET_STOCK_SYMBOLS = 'GET_STOCK_SYMBOLS'
export const GET_STOCK_SYMBOLS_ERROR = 'GET_STOCK_SYMBOLS_ERROR'

export function getStockSymbolsAction(symbols) {
  return {
    type: GET_STOCK_SYMBOLS,
    symbols,
  }
}

export function getStockSymbolErrorAction(error) {
  return {
    type: GET_STOCK_SYMBOLS_ERROR,
    error,
  }
}

export function symbolsObjFormatter(symsObj) {
  const defaultObj = {}

  return Object.keys(symsObj).length !== 0
    ? symsObj.reduce((obj, curSym) => {
        const { description, symbol } = curSym

        if (description && symbol) {
          const firstLetter = symbol[0].toUpperCase()

          return {
            ...obj,
            [firstLetter]:
              typeof obj[firstLetter] === 'undefined'
                ? [{ value: symbol, label: `${symbol} - ${description}` }]
                : [...obj[firstLetter], { value: symbol, label: `${symbol} - ${description}` }],
          }
        }

        return obj
      }, {})
    : defaultObj
}

export default function getStocksSymbols() {
  return async function (dispatch, _, api) {
    try {
      const response = await fetch(api.getStocksSymbols)

      if (response.ok) {
        const parsedRes = await response.json()
        const tidiedSymbolsObj = symbolsObjFormatter(parsedRes)

        return dispatch(getStockSymbolsAction(tidiedSymbolsObj))
      }

      throw new Error('error fetching symbols')
    } catch (error) {
      dispatch(getStockSymbolErrorAction(error.message))
    }
  }
}
