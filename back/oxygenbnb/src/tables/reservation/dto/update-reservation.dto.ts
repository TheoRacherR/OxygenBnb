import { PartialType } from '@nestjs/mapped-types';
import { CreateReservationDto } from './create-reservation.dto';

export class UpdateReservationDto extends PartialType(CreateReservationDto) {
  start_date?: Date;
  end_date?: Date;
  canceled?: Boolean;
}
