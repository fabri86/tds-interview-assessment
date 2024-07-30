import { useState } from 'react'
import { useCurrencies } from '../hooks/use-currencies'
import { AmountWithCurrency } from './amount-with-currency'
import { Currency } from '../types/currency.types'

type CurrencyExchangeProps = {
  convertedAmount?: string
}

export const CurrencyExchange = ({ convertedAmount = '' }: CurrencyExchangeProps) => {
  const { currencies, isLoading, error } = useCurrencies()

  const [fromAmount, setFromAmount] = useState<string>('')
  const [selectedFromCurrency, setSelectedFromCurrency] = useState<Currency | null>(null)
  const [selectedToCurrency, setSelectedToCurrency] = useState<Currency | null>(null)

  if (isLoading) {
    return <p className="h-full text-xl text-white">Loading...</p>
  }

  if (error) {
    return <p className="h-full text-xl text-red-400">Error: {error}</p>
  }

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
    alert('clicked')

    // TODO: Api convert call
  }

  return (
    <div className="flex flex-col h-auto gap-y-2">
      <AmountWithCurrency
        id="from"
        amount={fromAmount}
        selectedCurrency={selectedFromCurrency}
        currencies={currencies}
        onSetCurrency={handleCurrencyFromChanged}
        onAmountChanged={handleAmountChange}
      />

      <AmountWithCurrency
        id="to"
        amount={convertedAmount}
        isAmountInputDisabled={true}
        selectedCurrency={selectedToCurrency}
        currencies={currencies}
        onSetCurrency={handleCurrencyToChanged}
      />

      <button
        className="w-24 mt-6 text-white bg-orange-400 rounded-md"
        onClick={onCurrencyExchangeRun}
      >
        CONVERT
      </button>
    </div>
  )
}
