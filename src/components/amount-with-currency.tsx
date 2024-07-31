import { AmountWithCurrencySelectorIds, Currency } from '../types/currency.types'
import clsx from 'clsx'

const getLabelContent = (id: string) =>
  `${id === AmountWithCurrencySelectorIds.FROM ? 'Your' : 'Converted'} amount`

type AmountWithCurrencyProps = {
  amount: string
  currencies: Currency[]
  id: string
  isAmountInputDisabled?: boolean
  isProcessing: boolean
  onSetCurrency: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onAmountChanged?: (e: React.ChangeEvent<HTMLInputElement>) => void
  selectedCurrency: Currency | undefined
}

export const AmountWithCurrency = ({
  amount,
  currencies,
  selectedCurrency,
  onSetCurrency,
  onAmountChanged = () => {},
  isAmountInputDisabled,
  isProcessing,
  id,
}: AmountWithCurrencyProps) => (
  <div className="flex h-full text-base gap-x-4">
    <div className="flex flex-col">
      <label className="my-1 text-white">{getLabelContent(id)}</label>

      <input
        id={`${id}-amount-input`}
        aria-label={`insert ${id} amount`}
        className={clsx('h-6 px-2 bg-white rounded-sm', {
          '!bg-green-200': isAmountInputDisabled,
          '!bg-gray-200': isProcessing,
        })}
        disabled={isAmountInputDisabled}
        onChange={onAmountChanged}
        type="text"
        value={amount}
      />
    </div>

    <div className="flex flex-col">
      <label className="my-1 text-white">Currency</label>

      <select
        id={`${id}-currency-selector`}
        aria-label={`select-${id}-currency`}
        className={clsx('h-6 px-1 rounded-sm focus:outline-none', {
          'bg-gray-200': isProcessing,
        })}
        disabled={isProcessing}
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

// This presentation component could be split into smaller presentational components, bit will keep it in one file for quicker review
