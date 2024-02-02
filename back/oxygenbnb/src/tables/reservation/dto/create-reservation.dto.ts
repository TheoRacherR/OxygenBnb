import { Rental } from '../../rental/entities/rental.entity';
import { User } from '../../user/entities/user.entity';

export class CreateReservationDto {
  start_date: Date;
  end_date: Date;
  client: User;
  rental: Rental;
}
