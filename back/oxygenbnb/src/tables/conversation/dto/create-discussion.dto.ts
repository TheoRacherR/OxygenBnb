import { User } from '../../user/entities/user.entity';
import { Rental } from './../../rental/entities/rental.entity';
import { IsNotEmpty } from 'class-validator';

export class CreateConversationDto {
  @IsNotEmpty()
  client: User;

  @IsNotEmpty()
  renter: User;

  @IsNotEmpty()
  rental: Rental;
}
