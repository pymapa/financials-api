export interface CoinbaseUser {
  id: string,
  name: string,
  username: string,
  avatar_url: string,
  resource: string,
  time_zone: string,
  native_currency: string,

  country: Country,
  warnings: [Warning]
}

type Rates = {
  [key: string]: string
}

export type ExchangeRates = {
  currency: string,
  rates: Rates
}

export interface Account {

}
type Pagination = {
  ending_before: number,
  starting_before: number,
  previous_ending_before: number,
  next_starting_after: number,
  limit: number,
  order: string,
  previous_uri: string,
  next_uri: string
}


export interface UserResponse {
  data: CoinbaseUser,
  warnings: [Warning]
}

export interface ExchangesResponse {
  data: ExchangeRates,
  warnings: [Warning]
}

export type Warning = {
  id: string,
  message: string,
  url: string
}

export type Country = {
  code: string,
  name: string,
  is_in_europe: boolean
}

