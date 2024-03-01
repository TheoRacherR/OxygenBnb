import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { User } from '../../user/entities/user.entity';
import { currency, rentalType } from '../entities/rental.entity';

export class CreateRentalDto {
  @IsNumber()
  @IsNotEmpty()
  default_price: number;

  @IsEnum(currency)
  @IsOptional()
  default_currency?: currency;

  @IsEnum(rentalType)
  @IsOptional()
  type?: rentalType;

  @IsNotEmpty()
  @IsString()
  localisation_infos: string;

  @IsNotEmpty()
  owner: User;
}
