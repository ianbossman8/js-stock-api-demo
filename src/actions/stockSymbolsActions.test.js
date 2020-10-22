import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import getStocksSymbols, { GET_STOCK_SYMBOLS, symbolsObjFormatter } from './stocksSymbolsActions'
import { api } from '../store/store'

const middlewares = [thunk.withExtraArgument(api)]
const mockStore = configureMockStore(middlewares)

describe('stock symbols actions', () => {
  test('symbolsObjFormatter should return expected obj', () => {
    const exampleParsedRes = [
      {
        description: 'AGILENT TECHNOLOGIES INC',
        displaySymbol: 'A',
        symbol: 'A',
        type: 'EQS',
        currency: 'USD',
      },
      {
        description: 'ALCOA CORP',
        displaySymbol: 'AA',
        symbol: 'AA',
        type: 'EQS',
        currency: 'USD',
      },
      {
        description: 'PERTH MINT PHYSICAL GOLD ETF',
        displaySymbol: 'AAAU',
        symbol: 'AAAU',
        type: 'ETF',
        currency: 'USD',
      },
    ]

    expect(symbolsObjFormatter(exampleParsedRes)).toEqual({
      A: [
        { value: 'A', label: 'A - AGILENT TECHNOLOGIES INC' },
        { value: 'AA', label: 'AA - ALCOA CORP' },
        { value: 'AAAU', label: 'AAAU - PERTH MINT PHYSICAL GOLD ETF' },
      ],
    })
  })

  afterEach(() => {
    fetchMock.restore()
  })

  test('should return expected actions', () => {
    fetchMock.getOnce(api.getStocksSymbols, {})
    const store = mockStore({ error: '', symbols: {} })
    const expectedActions = [{ type: GET_STOCK_SYMBOLS, symbols: {} }]

    return store.dispatch(getStocksSymbols()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
