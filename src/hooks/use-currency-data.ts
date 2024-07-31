import axios from 'axios'
import { useEffect, useState } from 'react'

import { APP_CONFIGS } from '../app-config'
import { Currency } from '../types/currency.types'

const CURRENCIES = '/currencies'

type UseCurrencyDataParams = {
  apiKey: string
}

interface IApiResponse {
  response: Currency[]
}

export const useCurrencyData = ({ apiKey }: UseCurrencyDataParams) => {
  const [currencies, setCurrencies] = useState<Currency[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [loadingError, setLoadingError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCurrencies = async () => {
      setIsLoading(true)

      try {
        const response = await axios.get<IApiResponse>(
          `${APP_CONFIGS.CURRENCIES_API}${CURRENCIES}`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          }
        )

        setCurrencies(response.data.response)
      } catch (error) {
        setLoadingError(
          'An error occurred while fetching currencies. Please reload the app and try again'
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchCurrencies()
  }, [apiKey])

  return { currencies, isLoading, error: loadingError }
}
