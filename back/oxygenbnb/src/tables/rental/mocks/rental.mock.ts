import { CreateRentalDto } from '../dto/create-rental.dto';
import { UpdateRentalDto } from '../dto/update-rental.dto';
import { Rental, currency, rentalType } from '../entities/rental.entity';

export const rentalMock = [
  //Rental
  {
    id: 1,
    default_price: 0,
    default_currency: null,
    localisation_infos: 'string',
    isValid: false,
    active: false,
    type: rentalType.HOUSE,
    owner: {
      id: 1,
      firstname: 'string',
      lastname: 'string',
      email: 'string',
      password: 'string',
    },
  },
];

export const rentalMockCreate = {
  //CreateRentalDto
  default_price: 1,
  default_currency: currency.EUR,
  type: rentalType.HOUSE,
  localisation_infos: 'string',
  owner: {
    id: 1,
    firstname: 'string',
    lastname: 'string',
    email: 'string',
    password: 'string',
  },
};

export const rentalMockUpdate: UpdateRentalDto = {
  default_price: 1,
  default_currency: currency.EUR,
  type: rentalType.HOUSE,
  localisation_infos: 'string',
  isValid: false,
  active: false,
};
