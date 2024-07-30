import { useCallback, useEffect, useState } from 'react'
import clsx from 'clsx'

import { useCurrencies } from '../hooks/use-currencies'
import { AmountWithCurrency } from './amount-with-currency'
import { useCurrencyConverter } from '../hooks/use-currency-converter'
import { Currency } from '../types/currency.types'

export const CurrencyExchange = () => {
  const { currencies, isLoading, error: loadingError } = useCurrencies()
  const { convertCurrency, isProcessing, error: conversionError, result } = useCurrencyConverter()

  const [fromAmount, setFromAmount] = useState<string>('')
  const [selectedFromCurrency, setSelectedFromCurrency] = useState<Currency | null>(null)
  const [selectedToCurrency, setSelectedToCurrency] = useState<Currency | null>(null)

  const handleAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as string

    setFromAmount(value)
  }, [])

  const handleCurrencyFromChanged = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value

      const selectedCurrency = currencies.find((currency) => currency.short_code === value)

      if (selectedCurrency) {
        setSelectedFromCurrency(selectedCurrency)
      }
    },
    [currencies]
  )

  const handleCurrencyToChanged = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value

      const selectedCurrency = currencies.find((currency) => currency.short_code === value)

      if (selectedCurrency) {
        setSelectedToCurrency(selectedCurrency)
      }
    },
    [currencies]
  )

  const onCurrencyExchangeRun = () => {
    if (!selectedFromCurrency || !selectedToCurrency) {
      return alert('Please select the desired currencies')
    }

    const parsedAmount = fromAmount ? Number.parseFloat(fromAmount) : ''

    if (!parsedAmount) {
      return alert('Please insert a valid numeric amount')
    }

    convertCurrency({
      amount: parsedAmount,
      fromCurrency: selectedFromCurrency.short_code,
      toCurrency: selectedToCurrency.short_code,
    })
  }

  useEffect(() => {
    setSelectedFromCurrency(currencies?.[0])
    setSelectedToCurrency(currencies?.[0])
  }, [currencies])

  if (isLoading) {
    return <p className="h-full text-xl text-white">Loading currencies...</p>
  }

  if (loadingError) {
    return <p className="h-full text-base text-red-400">Error: {loadingError}</p>
  }

  return (
    <div className="flex flex-col h-auto gap-y-2">
      <AmountWithCurrency
        id="from"
        amount={fromAmount}
        isProcessing={isProcessing}
        selectedCurrency={selectedFromCurrency}
        currencies={currencies}
        onSetCurrency={handleCurrencyFromChanged}
        onAmountChanged={handleAmountChange}
      />

      <AmountWithCurrency
        id="to"
        amount={result?.convertedAmount.toString() || ''}
        isAmountInputDisabled={true}
        isProcessing={isProcessing}
        selectedCurrency={selectedToCurrency}
        currencies={currencies}
        onSetCurrency={handleCurrencyToChanged}
      />

      <div className="flex flex-col mt-2 gap-y-3">
        {
          <p className="h-2 text-xs text-red-400">
            {conversionError
              ? 'An error occurred while converting the currency. Please try again'
              : ''}
          </p>
        }

        <button
          className={clsx('w-24 text-white bg-orange-400 rounded-md', {
            'bg-gray-300': isProcessing,
          })}
          onClick={onCurrencyExchangeRun}
          disabled={isProcessing}
        >
          {isProcessing ? 'Converting' : 'CONVERT'}
        </button>
      </div>
    </div>
  )
}
