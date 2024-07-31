import { toast } from 'react-toastify'
import { useCallback, useEffect, useState } from 'react'
import clsx from 'clsx'

import { useCurrencies } from '../hooks/use-currencies'
import { AmountWithCurrency } from './amount-with-currency'
import { useCurrencyConverter } from '../hooks/use-currency-converter'
import { AmountWithCurrencySelectorIds, Currency } from '../types/currency.types'

const findCurrency = (currencies: Currency[], currencyShortCode: string): Currency | undefined =>
  currencies.find((currency) => currency.short_code === currencyShortCode)

export const CurrencyExchange = () => {
  const { currencies, isLoading, error: loadingError } = useCurrencies()
  const { convertCurrency, isProcessing, error: conversionError, result } = useCurrencyConverter()

  const [isFormDirty, setIsFormDirty] = useState<boolean>(false)
  const [fromAmount, setFromAmount] = useState<string>('')
  const [selectedFromCurrency, setSelectedFromCurrency] = useState<Currency | undefined>(undefined)
  const [selectedToCurrency, setSelectedToCurrency] = useState<Currency | undefined>(undefined)
  // Minor comment - could be worth to start thinking about using useReducer to avoid subsequent setState ops (even if they are batched under the hood)

  const handleAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFormDirty(true)
    setFromAmount(e.target.value)
  }, [])

  const handleCurrencyFromChanged = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setIsFormDirty(true)
      setSelectedFromCurrency(findCurrency(currencies, e.target.value))
    },
    [currencies]
  )

  const handleCurrencyToChanged = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setIsFormDirty(true)
      setSelectedToCurrency(findCurrency(currencies, e.target.value))
    },
    [currencies]
  )

  const onCurrencyExchangeRun = useCallback(() => {
    if (!selectedFromCurrency || !selectedToCurrency) {
      return toast.warn('Please select the desired currencies')
    }

    const parsedAmount = fromAmount ? Number.parseFloat(fromAmount) : ''

    if (!parsedAmount) {
      return toast.warn('Please insert a valid amount')
    }

    convertCurrency({
      amount: parsedAmount,
      fromCurrency: selectedFromCurrency.short_code,
      toCurrency: selectedToCurrency.short_code,
    })

    setIsFormDirty(false)
  }, [selectedFromCurrency, selectedToCurrency, fromAmount, convertCurrency])

  useEffect(() => {
    setSelectedFromCurrency(currencies?.[0])
    setSelectedToCurrency(currencies?.[0])
  }, [currencies])

  useEffect(() => {
    if (result && conversionError) {
      toast.error('Failed exchanging the currency')
    }
  }, [result, conversionError])

  if (isLoading) {
    return <p className="h-full text-xl text-white">Loading currencies...</p>
  }

  if (loadingError) {
    toast.error('Failed loading currencies')
    return <p className="h-full text-base text-red-600">Error details: {loadingError}</p>
  }

  return (
    <div className="flex flex-col h-auto gap-y-2">
      <AmountWithCurrency
        amount={fromAmount}
        currencies={currencies}
        id={AmountWithCurrencySelectorIds.FROM}
        isProcessing={isProcessing}
        selectedCurrency={selectedFromCurrency}
        onAmountChanged={handleAmountChange}
        onSetCurrency={handleCurrencyFromChanged}
      />

      <AmountWithCurrency
        amount={isFormDirty || isProcessing ? '' : result?.convertedAmount.toString() ?? ''}
        currencies={currencies}
        id={AmountWithCurrencySelectorIds.TO}
        isAmountInputDisabled={true}
        isProcessing={isProcessing}
        selectedCurrency={selectedToCurrency}
        onSetCurrency={handleCurrencyToChanged}
      />

      <div className="flex flex-col mt-2 gap-y-3">
        <p className="h-2 text-xs text-red-600">
          {conversionError ? 'An error occurred while converting the amount. Please try again' : ''}
        </p>

        <button
          className={clsx('w-28 px-2 text-white bg-orange-400 rounded-md', {
            '!bg-gray-300': isProcessing,
          })}
          onClick={onCurrencyExchangeRun}
          disabled={isProcessing}
        >
          {isProcessing ? 'Converting...' : 'Convert'}
        </button>
      </div>
    </div>
  )
}
