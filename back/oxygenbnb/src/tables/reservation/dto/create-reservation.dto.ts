import { IsDate, IsNotEmpty } from 'class-validator';
import { Rental } from '../../rental/entities/rental.entity';
import { User } from '../../user/entities/user.entity';

export class CreateReservationDto {
  @IsDate()
  @IsNotEmpty()
  start_date: Date;

  @IsDate()
  @IsNotEmpty()
  end_date: Date;

  @IsNotEmpty()
  client: User;

  @IsNotEmpty()
  rental: Rental;
}
