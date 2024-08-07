import { useState, useCallback } from 'react'
import axios from 'axios'
import { APP_CONFIGS } from '../app-config'
import { CurrencyConversionResult } from '../types/currency.types'

const CONVERT = '/convert'

type CurrencyConverterParams = {
  amount: number
  fromCurrency: string
  toCurrency: string
}

export const useCurrencyConverter = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<CurrencyConversionResult | null>(null)

  const convertCurrency = useCallback(
    async ({ amount, fromCurrency, toCurrency }: CurrencyConverterParams) => {
      setIsProcessing(true)
      setError(null)

      try {
        const response = await axios.get(`${APP_CONFIGS.CURRENCIES_API}${CONVERT}`, {
          params: {
            amount,
            from: fromCurrency,
            to: toCurrency,
          },
          headers: {
            Authorization: `Bearer ${APP_CONFIGS.API_KEY}`,
          },
        })

        const { value: convertedAmount } = response.data

        setResult({
          amount,
          fromCurrency,
          toCurrency,
          convertedAmount,
        })
      } catch (error) {
        setError('An error occurred when converting the amount. Please try again')
      } finally {
        setIsProcessing(false)
      }
    },
    []
  )

  return { convertCurrency, result, isProcessing, error }
}
