export type Currency = {
  id: number
  name: string
  short_code: string
  code: string
  precision: number
  subunit: number
  symbol: string
  symbol_first: boolean
  decimal_mark: string
  thousands_separator: string
}

export enum AmountWithCurrencySelectorIds {
  FROM = 'from',
  TO = 'to',
}
