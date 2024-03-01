import { PartialType } from '@nestjs/mapped-types';
import { CreateRentalDto } from './create-rental.dto';
import { currency, rentalType } from '../entities/rental.entity';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateRentalDto extends PartialType(CreateRentalDto) {
  @IsOptional()
  @IsNumber()
  default_price?: number;

  @IsOptional()
  @IsEnum(currency)
  default_currency?: currency;

  @IsOptional()
  @IsEnum(rentalType)
  type?: rentalType;

  @IsOptional()
  @IsString()
  localisation_infos?: string;

  @IsOptional()
  @IsBoolean()
  isValid?: boolean;
}
