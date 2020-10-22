import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import StockSelect from './StockSelect'

describe('ExchangeAction Component', () => {
  let props = {
    symbols: {
      symbols: {
        A: [
          { value: 'A', label: 'A - AGILENT TECHNOLOGIES INC' },
          { value: 'AA', label: 'AA - ALCOA CORP' },
          { value: 'GOOG', label: 'GOOG - GOOGLE' },
        ],
      },
    },
    selectedSyms: [],
    setSymbols: jest.fn(),
    removeSymbol: jest.fn(),
  }

  test('should renders - - if no stock selected', () => {
    render(<StockSelect {...props} />)
    const emptySymbol = screen.getByText(/- -/i)

    expect(emptySymbol).toBeInTheDocument()
  })

  test('should renders button with text A', () => {
    props = {
      ...props,
      selectedSyms: ['A'],
    }

    render(<StockSelect {...props} />)
    const buttonText = screen.getByRole('button').textContent

    expect(buttonText).toBe('A')
  })

  test('should have a list with 2 items', () => {
    props = {
      ...props,
      selectedSyms: ['A', 'AA'],
    }

    render(<StockSelect {...props} />)
    const list = screen.getAllByRole('listitem')

    expect(list).toHaveLength(2)
  })

  test('should call removeSymbol', () => {
    props = {
      ...props,
      selectedSyms: ['A'],
    }

    render(<StockSelect {...props} />)

    const stockButton = screen.getByRole('button')
    userEvent.click(stockButton)

    expect(props.removeSymbol).toHaveBeenCalledTimes(1)
    expect(props.removeSymbol).toHaveBeenCalledWith('A')
  })

  test('should list options when autocomplete is clicked', async () => {
    render(<StockSelect {...props} />)

    const searchBox = screen.getByLabelText('Stock Select')

    await waitFor(() => {
      userEvent.click(searchBox)
    })

    expect(screen.getByText('A - AGILENT TECHNOLOGIES INC')).toBeInTheDocument()
    expect(screen.getByText('AA - ALCOA CORP')).toBeInTheDocument()
  })

  test('should set error when same symbol included', async () => {
    props = {
      ...props,
      selectedSyms: ['A'],
    }

    render(<StockSelect {...props} />)

    const searchBox = screen.getByLabelText('Stock Select')
    userEvent.click(searchBox)
    const stockOption = screen.getByText('A - AGILENT TECHNOLOGIES INC')
    await waitFor(() => {
      userEvent.click(stockOption)
    })

    expect(props.setSymbols).toHaveBeenCalledTimes(0)

    const errorText = screen.getByText('do not repeat symbols')
    expect(errorText).toBeInTheDocument()
  })

  test('should set error when more than 3 symbols selected', async () => {
    props = {
      ...props,
      selectedSyms: ['A', 'AA', 'AAA'],
    }

    render(<StockSelect {...props} />)

    const searchBox = screen.getByLabelText('Stock Select')
    userEvent.click(searchBox)
    const stockOption = screen.getByText('GOOG - GOOGLE')
    await waitFor(() => {
      userEvent.click(stockOption)
    })

    expect(props.setSymbols).toHaveBeenCalledTimes(0)

    const errorText = screen.getByText('do not select more than 3 symbols')
    expect(errorText).toBeInTheDocument()
  })

  test('should call setSymbols once', async () => {
    const newProps = {
      symbols: {
        symbols: {
          A: [
            { value: 'A', label: 'A - AGILENT TECHNOLOGIES INC' },
            { value: 'AA', label: 'AA - ALCOA CORP' },
            { value: 'GOOG', label: 'GOOG - GOOGLE' },
          ],
        },
      },
      selectedSyms: [],
      setSymbols: jest.fn(),
      removeSymbol: jest.fn(),
    }
    render(<StockSelect {...newProps} />)

    const searchBox = screen.getByLabelText('Stock Select')

    userEvent.click(searchBox)

    const stockOption = screen.getByText('AA - ALCOA CORP')
    userEvent.click(stockOption)
    await waitFor(() => {
      expect(newProps.setSymbols).toHaveBeenCalledTimes(1)
      expect(newProps.setSymbols).toHaveBeenCalledWith('AA')
    })
  })
})
