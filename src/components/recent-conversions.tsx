import { CurrencyConversionResult } from '../types/currency.types'

interface IRecentConversions {
  items: CurrencyConversionResult[]
  showMax?: number
}

export const RecentConversions = ({ items, showMax }: IRecentConversions) => {
  return (
    <div className="text-white">
      <h2>Your last {showMax} transactions</h2>

      <ul>
        {items.map((item, index) => (
          <li key={`conversion-list-item-${index}`}>
            <span className="flex gap-x-5">
              <span className="flex gap-x-1">
                <span>{item.amount}</span>
                <span>{item.fromCurrency}</span>
              </span>

              <span className="flex gap-x-1">
                <span>{item.convertedAmount}</span>
                <span>{item.toCurrency}</span>
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
