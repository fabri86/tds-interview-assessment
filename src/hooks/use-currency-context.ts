import { useContext } from 'react'
import { CurrenciesContext } from '../components/currencies-provider'

export const useCurrencyContext = () => {
  const context = useContext(CurrenciesContext)

  if (!context) {
    throw new Error('useCurrencies must be used within a CurrencyProvider')
  }

  return context
}
