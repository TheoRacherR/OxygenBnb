import { Rental } from '../../rental/entities/rental.entity';
import { rentalDateType } from '../entities/rental-date.entity';

export class CreateRentalDateDto {
  type: rentalDateType;
  start_date: Date;
  end_date: Date;
  rental: Rental;
}
