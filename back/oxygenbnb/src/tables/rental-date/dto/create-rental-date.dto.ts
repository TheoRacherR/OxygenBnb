import { IsDateString, IsEnum, IsNotEmpty } from 'class-validator';
import { Rental } from '../../rental/entities/rental.entity';
import { rentalDateType } from '../entities/rental-date.entity';

export class CreateRentalDateDto {
  @IsNotEmpty()
  @IsEnum(rentalDateType)
  type: rentalDateType;

  @IsNotEmpty()
  @IsDateString()
  start_date: Date;

  @IsNotEmpty()
  @IsDateString()
  end_date: Date;

  @IsNotEmpty()
  rental: Rental;
}
