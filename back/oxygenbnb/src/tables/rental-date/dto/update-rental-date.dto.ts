import { PartialType } from '@nestjs/mapped-types';
import { CreateRentalDateDto } from './create-rental-date.dto';
import { rentalDateType } from '../entities/rental-date.entity';

export class UpdateRentalDateDto extends PartialType(CreateRentalDateDto) {
  type?: rentalDateType;
  start_date?: Date;
  end_date?: Date;
}
