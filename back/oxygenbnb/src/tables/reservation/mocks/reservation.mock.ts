import { Rental } from '../../rental/entities/rental.entity';
import { User, userRole } from '../../user/entities/user.entity';

export const reservationMock = [
  {
    id: 1,
    start_date: new Date(),
    end_date: new Date(),
    canceled: false,
    rental: {
      id: 1,
      default_price: 0,
      default_currency: null,
      type: null,
      localisation_infos: 'string',
      isValid: false,
      owner: User,
    },
    client: {
      id: 1,
      email: 'string',
      password: 'string',
      firstname: 'string',
      lastname: 'string',
      created_at: new Date(),
      updated_at: new Date(),
      role: userRole.USER,
    },
  },
];

export const reservationMockCreate = {
  start_date: new Date(),
  end_date: new Date(),
  rental: Rental,
  client: User,
};

export const reservationMockUpdate = {
  start_date: new Date(),
  end_date: new Date(),
  canceled: false,
};
