import { IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../user/entities/user.entity';
import { Conversation } from '../../conversation/entities/conversation.entity';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  owner: User;

  @IsNotEmpty()
  conversation: Conversation;
}
