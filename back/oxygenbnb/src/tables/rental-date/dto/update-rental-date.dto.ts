import { PartialType } from '@nestjs/mapped-types';
import { CreateRentalDateDto } from './create-rental-date.dto';
import { rentalDateType } from '../entities/rental-date.entity';
import { IsDateString, IsEnum, IsOptional } from 'class-validator';

export class UpdateRentalDateDto extends PartialType(CreateRentalDateDto) {
  @IsEnum(rentalDateType)
  @IsOptional()
  type?: rentalDateType;

  @IsDateString()
  @IsOptional()
  start_date?: Date;

  @IsDateString()
  @IsOptional()
  end_date?: Date;
}
