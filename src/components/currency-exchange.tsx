import { useEffect, useState } from 'react'
import clsx from 'clsx'

import { useCurrencies } from '../hooks/use-currencies'
import { AmountWithCurrency } from './amount-with-currency'
import { useCurrencyConverter } from '../hooks/use-currency-converter'
import { Currency } from '../types/currency.types'

export const CurrencyExchange = () => {
  const { currencies, isLoading, error: loadingError } = useCurrencies()
  const { convertCurrency, isProcessing, error, result } = useCurrencyConverter()

  const [fromAmount, setFromAmount] = useState<string>('')
  const [selectedFromCurrency, setSelectedFromCurrency] = useState<Currency | null>(null)
  const [selectedToCurrency, setSelectedToCurrency] = useState<Currency | null>(null)

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as string

    setFromAmount(value)
  }

  const handleCurrencyFromChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value

    const selectedCurrency = currencies.find((c) => c.short_code === value)

    if (selectedCurrency) {
      setSelectedFromCurrency(selectedCurrency)
    }
  }

  const handleCurrencyToChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value

    const selectedCurrency = currencies.find((c) => c.short_code === value)

    if (selectedCurrency) {
      setSelectedToCurrency(selectedCurrency)
    }
  }

  const onCurrencyExchangeRun = () => {
    if (!selectedFromCurrency || !selectedToCurrency) {
      return alert('Please select currencies')
    }

    const parsedAmount = fromAmount ? Number.parseFloat(fromAmount) : ''

    if (!parsedAmount) {
      return alert('Please insert a valid amount')
    }

    convertCurrency({
      amount: parsedAmount,
      fromCurrency: selectedFromCurrency.short_code,
      toCurrency: selectedToCurrency.short_code,
    })
  }

  useEffect(() => {
    console.log({ result })
  }, [result])

  if (isLoading) {
    return <p className="h-full text-xl text-white">Loading...</p>
  }

  if (loadingError) {
    return <p className="h-full text-xl text-red-400">Error: {error}</p>
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

      <button
        className={clsx('w-24 mt-6 text-white bg-orange-400 rounded-md', {
          'bg-gray-300': isProcessing,
        })}
        onClick={onCurrencyExchangeRun}
        disabled={isProcessing}
      >
        {isProcessing ? 'Converting' : 'CONVERT'}
      </button>
    </div>
  )
}
