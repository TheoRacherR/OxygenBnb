import { PartialType } from '@nestjs/mapped-types';
import { CreateReservationDto } from './create-reservation.dto';
import { IsBoolean, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class UpdateReservationDto extends PartialType(CreateReservationDto) {
  @IsOptional()
  @IsDateString()
  start_date?: Date;

  @IsOptional()
  @IsDateString()
  end_date?: Date;

  @IsOptional()
  @IsBoolean()
  canceled?: boolean;

  @IsOptional()
  @IsNumber()
  nb_adult?: number;

  @IsOptional()
  @IsNumber()
  nb_children?: number;

  @IsOptional()
  @IsNumber()
  price_per_night?: number;

  @IsOptional()
  @IsNumber()
  total_fees?: number;

  @IsOptional()
  @IsNumber()
  total_price?: number;

  @IsOptional()
  @IsNumber()
  nb_night: number;
}
