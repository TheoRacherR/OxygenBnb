import { gender } from '../entities/user-info.entity';

export class UpdateUserInfoDto {
  gender?: gender;
  // birth_date?: Date;
  desciption?: string;
}
