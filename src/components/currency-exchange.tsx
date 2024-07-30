import { useCurrencies } from '../hooks/use-currencies'

export const CurrencyExchange = () => {
  const { currencies, isLoading, error } = useCurrencies()

  if (isLoading) {
    return <p className="h-full text-xl text-white">Loading...</p>
  }

  if (error) {
    return <p className="h-full text-xl text-red-400">Error: {error}</p>
  }

  return (
    <div className="flex h-auto overflow-auto">
      <ul>
        {currencies?.map((currency) => (
          <li key={`currency id ${currency.id}`} className="text-white">
            {currency.short_code}
          </li>
        ))}
      </ul>
    </div>
  )
}
