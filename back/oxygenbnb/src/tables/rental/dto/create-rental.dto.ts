import { User } from '../../user/entities/user.entity';
import { currency, rentalType } from '../entities/rental.entity';

export class CreateRentalDto {
  default_price: number;
  default_currency?: currency;
  type?: rentalType;
  localisation_infos: string;
  owner: User;
}
