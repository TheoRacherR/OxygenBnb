import { PartialType } from '@nestjs/mapped-types';
import { CreateReservationDto } from './create-reservation.dto';
import { IsBoolean, IsDate, IsOptional } from 'class-validator';

export class UpdateReservationDto extends PartialType(CreateReservationDto) {

  @IsOptional()
  @IsDate()
  start_date?: Date;
  
  @IsOptional()
  @IsDate()
  end_date?: Date;
  
  @IsOptional()
  @IsBoolean()
  canceled?: Boolean;
}
