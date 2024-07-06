import {
  IsBoolean,
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
  description: string;

  @IsNotEmpty()
  @IsString()
  localisation_infos: string;

  @IsNotEmpty()
  owner: User;

  @IsBoolean()
  active: boolean;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  nb_max_person: number;

  @IsNumber()
  @IsNotEmpty()
  nb_max_bed: number;

  @IsNumber()
  @IsNotEmpty()
  nb_max_room: number;

  // @IsString()
  // @IsOptional()
  // img_name?: string;
}
