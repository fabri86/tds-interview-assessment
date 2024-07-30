import axios from 'axios'
import { useEffect, useState } from 'react'

import { APP_CONFIGS } from '../app-config'
import { Currency } from '../types/currency.types'

const CURRENCIES = '/currencies'

type UseCurrencyApiParams = {
  apiKey: string
}

interface IApiResponse {
  response: Currency[]
}

export const useCurrenciesApi = ({ apiKey }: UseCurrencyApiParams) => {
  const [currencies, setCurrencies] = useState<Currency[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

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
        setError('An error occurred while fetching currencies')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCurrencies()
  }, [apiKey])

  return { currencies, isLoading, error }
}
