import { IsDate, IsEnum, IsNotEmpty } from 'class-validator';
import { Rental } from '../../rental/entities/rental.entity';
import { rentalDateType } from '../entities/rental-date.entity';

export class CreateRentalDateDto {
  @IsNotEmpty()
  @IsEnum(rentalDateType)
  type: rentalDateType;

  @IsNotEmpty()
  @IsDate()
  start_date: Date;

  @IsNotEmpty()
  @IsDate()
  end_date: Date;

  @IsNotEmpty()
  rental: Rental;
}
