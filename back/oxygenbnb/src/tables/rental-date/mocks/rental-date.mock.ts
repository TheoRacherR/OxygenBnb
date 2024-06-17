import { Rental, rentalType } from '../../rental/entities/rental.entity';
import { rentalDateType } from '../entities/rental-date.entity';
import { User } from '../../user/entities/user.entity';

export const rentalDateMock = [
  {
    id: 1,
    type: rentalDateType.BLOCKED,
    start_date: new Date(),
    end_date: new Date(),
    rental: {
      id: 1,
      default_price: 0,
      default_currency: null,
      localisation_infos: 'string',
      description: 'string',
      isValid: false,
      type: rentalType.HOUSE,
      owner: User,
    },
  },
];

export const rentalDateMockCreate = {
  type: rentalDateType.BLOCKED,
  start_date: new Date(),
  end_date: new Date(),
  rental: Rental,
};

export const rentalDateMockUpdate = {
  type: rentalDateType.BLOCKED,
  start_date: new Date(),
  end_date: new Date(),
};
