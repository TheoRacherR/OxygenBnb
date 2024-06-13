import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';
import { Rental } from '../../rental/entities/rental.entity';
import { User } from '../../user/entities/user.entity';

export class CreateReservationDto {
  @IsDateString()
  @IsNotEmpty()
  start_date: Date;

  @IsDateString()
  @IsNotEmpty()
  end_date: Date;

  @IsNotEmpty()
  client: User;

  @IsNotEmpty()
  rental: Rental;

  @IsNumber()
  nb_adult: number;

  @IsNumber()
  nb_children: number;

  @IsNumber()
  price_per_night: number;

  @IsNumber()
  total_fees: number;

  @IsNumber()
  total_price: number;

  @IsNumber()
  nb_night: number;
}
