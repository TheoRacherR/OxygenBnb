import { PartialType } from '@nestjs/mapped-types';
import { CreateUserInfoDto } from './create-user-info.dto';
import { gender } from '../entities/user-info.entity';

export class UpdateUserInfoDto extends PartialType(CreateUserInfoDto) {
  gender?: gender;
  birth_date?: Date;
  desciption?: string;
}
