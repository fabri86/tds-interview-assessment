import { Currency } from '../types/currency.types'
import clsx from 'clsx'

type AmountWithCurrencyProps = {
  amount: string
  currencies: Currency[]
  selectedCurrency: Currency | null
  onSetCurrency: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onAmountChanged?: (e: React.ChangeEvent<HTMLInputElement>) => void
  isAmountInputDisabled?: boolean
  id: string
}

export const AmountWithCurrency = ({
  amount,
  currencies,
  selectedCurrency,
  onSetCurrency,
  onAmountChanged = () => {},
  isAmountInputDisabled,
  id,
}: AmountWithCurrencyProps) => {
  return (
    <div className="flex h-full gap-x-4">
      <div className="flex flex-col">
        <label className="my-1 text-base text-white">
          {id === 'from' ? 'Insert' : 'Converted'} amount
        </label>
        <input
          id={`${id}-amount-input`}
          aria-label={`insert ${id} amount`}
          className={clsx('h-6 px-2 bg-white rounded-sm', {
            'bg-green-200': isAmountInputDisabled,
          })}
          disabled={isAmountInputDisabled}
          onChange={onAmountChanged}
          type="text"
          value={amount}
        />
      </div>

      <div className="flex flex-col">
        <label className="my-1 text-base text-white">Currency</label>
        <select
          id={`${id}-currency-selector`}
          aria-label={`select-${id}-currency`}
          className="h-6 px-1 rounded-sm focus:outline-none"
          onChange={onSetCurrency}
          value={selectedCurrency?.short_code}
        >
          {currencies.map((currency) => (
            <option key={`${id}-option-${currency.id}`} value={currency.short_code}>
              {currency.short_code}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}