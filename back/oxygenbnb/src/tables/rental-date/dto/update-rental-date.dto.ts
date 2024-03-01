import { PartialType } from '@nestjs/mapped-types';
import { CreateRentalDateDto } from './create-rental-date.dto';
import { rentalDateType } from '../entities/rental-date.entity';
import { IsDate, IsEnum, IsOptional } from 'class-validator';

export class UpdateRentalDateDto extends PartialType(CreateRentalDateDto) {
  @IsEnum(rentalDateType)
  @IsOptional()
  type?: rentalDateType;

  @IsDate()
  @IsOptional()
  start_date?: Date;

  @IsDate()
  @IsOptional()
  end_date?: Date;
}
