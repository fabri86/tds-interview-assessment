import { createContext, ReactElement } from 'react'
import { useCurrencyData } from '../hooks/use-currency-data'

import { Currency } from '../types/currency.types'

export const CurrenciesContext = createContext<
  | {
      currencies: Currency[]
      isLoading: boolean
      error: string | null
    }
  | undefined
>(undefined)

type CurrenciesProviderProps = {
  apiKey: string
  children: ReactElement
}

export const CurrenciesProvider = ({ apiKey, children }: CurrenciesProviderProps) => {
  const currenciesData = useCurrencyData({ apiKey })

  return <CurrenciesContext.Provider value={currenciesData}>{children}</CurrenciesContext.Provider>
}
