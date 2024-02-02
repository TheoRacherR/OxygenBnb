import { User } from '../../user/entities/user.entity';
import { gender } from '../entities/user-info.entity';

export class CreateUserInfoDto {
  gender: gender;
  birth_date?: Date;
  desciption?: string;
  user: User;
}
