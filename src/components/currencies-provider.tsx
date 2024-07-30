import { createContext, ReactElement } from 'react'
import { useCurrenciesApi } from '../hooks/use-currency-api'

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
  const currenciesData = useCurrenciesApi({ apiKey })

  return <CurrenciesContext.Provider value={currenciesData}>{children}</CurrenciesContext.Provider>
}
