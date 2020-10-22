import React, { useMemo, useState } from 'react'
import { AutoComplete, Tooltip } from 'antd'
import './stockSelect.css'

const autoCompleteId = 'symbol-select'

function objForAutoComplete(obj) {
  return Object.entries(obj).reduce(
    (list, [key, value]) => [
      ...list,
      {
        label: key,
        options: value,
      },
    ],
    []
  )
}

function StockSelect(props) {
  const { symbols, selectedSyms, setSymbols, removeSymbol } = props

  const [selectionError, setSelectionError] = useState('')
  const [inputValue, setInputValue] = useState('')

  const syms = useMemo(() => objForAutoComplete(symbols.symbols), [symbols.symbols])

  function handleSelect(value) {
    if (selectedSyms.includes(value)) {
      return setSelectionError('do not repeat symbols')
    }

    if (selectedSyms.length >= 3) {
      return setSelectionError('do not select more than 3 symbols')
    }

    setSelectionError('')
    setInputValue(value.toUpperCase())
    setSymbols(value)
  }

  function handleSearch(value) {
    setInputValue(value.toUpperCase())
  }

  function handleStockButtonClick(event) {
    event.preventDefault()

    removeSymbol(event.target.value)
  }

  return (
    <div className="stock-select">
      <label htmlFor={autoCompleteId}>Stock Select</label>
      <AutoComplete
        id={autoCompleteId}
        options={syms}
        allowClear
        filterOption
        notFoundContent={'options not found'}
        value={inputValue}
        onSelect={handleSelect}
        onSearch={handleSearch}
      />
      <ul className="stock-select-list" aria-label="selected stocks">
        {selectedSyms.length === 0
          ? ' - -'
          : selectedSyms.map((selectedSym) => (
              <li key={selectedSym}>
                <Tooltip title="click to remove this stock" placement="bottom">
                  <button className="stock-pick-button" value={selectedSym} onClick={handleStockButtonClick}>
                    {selectedSym}
                  </button>
                </Tooltip>
              </li>
            ))}
      </ul>
      <p className="stock-select-error">{selectionError}</p>
    </div>
  )
}

export default StockSelect
