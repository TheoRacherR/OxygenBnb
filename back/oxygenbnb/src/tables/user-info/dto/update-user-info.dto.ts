import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { gender } from '../entities/user-info.entity';

export class UpdateUserInfoDto {
  @IsEnum(gender)
  @IsOptional()
  gender?: gender;
  
  @IsDate()
  @IsOptional()
  birth_date?: Date;
  
  @IsString()
  @IsOptional()
  desciption?: string;
}
