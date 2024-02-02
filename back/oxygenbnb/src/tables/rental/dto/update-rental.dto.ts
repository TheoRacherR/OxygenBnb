import { PartialType } from '@nestjs/mapped-types';
import { CreateRentalDto } from './create-rental.dto';
import { currency, rentalType } from '../entities/rental.entity';

export class UpdateRentalDto extends PartialType(CreateRentalDto) {
  default_price?: number;
  default_currency?: currency;
  type?: rentalType;
  localisation_infos?: string;
  isValid?: boolean;
}
