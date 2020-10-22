import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import getStockData, { GET_STOCK_PRICES_ERROR, fetchData } from './stockPricesActions'
import { api } from '../store/store'

const middlewares = [thunk.withExtraArgument(api)]
const mockStore = configureMockStore(middlewares)

describe('stock prices actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  test('should return type GET_STOCK_PRICES_ERROR if error', () => {
    const store = mockStore({ error: '' })

    return store.dispatch(getStockData()).then(() => {
      expect(store.getActions()[0].type).toEqual(GET_STOCK_PRICES_ERROR)
    })
  })

  test('should have the expected actions', () => {
    fetchMock.getOnce(
      'https://finnhub.io/api/v1/stock/candle?symbol=A&resolution=D&from=16700&to=16800&token=bu0961n48v6qoj763pog',
      {}
    )
    const store = mockStore({ error: '' })
    const expectedActions = []

    return store.dispatch(getStockData('A', 'D', [16700, 16800])).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  test('should return an abortObj', () => {
    fetchMock.getOnce(
      'https://finnhub.io/api/v1/stock/candle?symbol=A&resolution=D&from=16700&to=16800&token=bu0961n48v6qoj763pog',
      {}
    )
    const store = mockStore({ error: '' })

    return store.dispatch(getStockData('A', 'D', [16700, 16800])).then((abortObj) => {
      expect(Object.keys(abortObj['A'])[0]).toEqual('controller')
    })
  })

  test('should call with the correct params', () => {
    const fn = jest.fn()
    const controller = new AbortController()
    const { signal } = controller
    fetchData('A', fn, signal, 'D', [123, 234])

    expect(fn).toHaveBeenCalledWith('A', 'D', 123, 234)
  })
})
