import { currency, rentalType } from "../entities/rental.entity"

export const rentalMock = [
  {
    id: 1,
    default_price: 0,
    default_currency: null,
    localisation_infos: "string",
    isValid: false,
    type: rentalType.HOUSE,
    owner: {
      id: 1,
      firstname: "string",
      lastname: "string",
      email: "string",
      password: "string"
    },
  }
]

export const rentalMockCreate = {
  default_price: 1,
  default_currency: currency.EUR,
  type: rentalType.HOUSE,
  localisation_infos: "string",
  owner: {
    id: 1,
    firstname: "string",
    lastname: "string",
    email: "string",
    password: "string",
  },
}

export const rentalMockUpdate = {
  default_price: 1,
  default_currency: currency.EUR,
  type: rentalType.HOUSE,
  localisation_infos: "string",
  isValid: false,
}