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