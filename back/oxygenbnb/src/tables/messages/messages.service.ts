import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from './entities/messages.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-messages.dto';
import { User } from '../user/entities/user.entity';

export interface MessageFormated {
  id: number;
  text: string;
  created_at: Date;
  owner: User;
}

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Messages)
    private messagesRepository: Repository<Messages>,
  ) {}

  async findOne(id: number): Promise<MessageFormated> {
    const messageData = await this.messagesRepository.findOne({
      where: { id },
    });
    return messageData;
  }

  async findLastMessageFromAConversation(
    conv_id: number,
  ): Promise<MessageFormated> {
    const lastMessage = await this.messagesRepository.findOne({
      where: { conversation: { id: conv_id } },
      order: { created_at: 'DESC' },
    });
    return lastMessage;
  }

  async findLimitedFromConversation(
    conv_id: number,
    limit: number,
  ): Promise<MessageFormated[]> {
    let lastMessages = null;
    if (limit === 0) {
      lastMessages = await this.messagesRepository.find({
        where: { conversation: { id: conv_id } },
        order: { created_at: 'DESC' },
      });
    } else {
      lastMessages = await this.messagesRepository.find({
        where: { conversation: { id: conv_id } },
        order: { created_at: 'DESC' },
        take: limit,
      });
    }
    return lastMessages;
  }

  async create(messageInfos: CreateMessageDto): Promise<{ message: string }> {
    await this.messagesRepository.insert(messageInfos);
    return { message: `Message created` };
  }

  async delete(id: number): Promise<{ message: string }> {
    await this.messagesRepository.delete(id);
    return { message: `Message ${id} deleted` };
  }
}
