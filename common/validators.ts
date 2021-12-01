import { Currency } from "./constants"

export const isValidCurrencyCode = (code: string) => {
  return Currency.hasOwnProperty(code)
}