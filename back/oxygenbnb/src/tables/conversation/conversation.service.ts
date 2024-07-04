import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from './entities/conversation.entity';
import { Repository } from 'typeorm';
import { CreateConversationDto } from './dto/create-discussion.dto';
import { UserLimited } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { Rental } from '../rental/entities/rental.entity';

export interface ConversationFormated {
  id: number;
  created_at: Date;
  updated_at: Date;
  client: UserLimited;
  renter: UserLimited;
  rental: {
    id: number;
  };
}

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
  ) {}

  async findOne(id: number): Promise<ConversationFormated> {
    const convData = await this.conversationRepository.findOne({
      where: { id },
    });
    if (convData)
      return {
        id: convData.id,
        created_at: convData.created_at,
        updated_at: convData.updated_at,
        client: {
          id: convData.client.id,
          firstname: convData.client.firstname,
          lastname: convData.client.lastname,
        },
        renter: {
          id: convData.renter.id,
          firstname: convData.renter.firstname,
          lastname: convData.renter.lastname,
        },
        rental: {
          id: convData.rental.id,
        },
      };
    else return convData;
  }

  async findAllForClientAndRenter(
    client: User,
    renter: User,
    rental: Rental,
  ): Promise<Conversation[]> {
    const convListData = await this.conversationRepository.find({
      where: {
        client: { id: client as any },
        renter: { id: renter as any },
        rental: { id: rental as any },
      },
    });
    const convListDataFiltered = convListData.filter(
      (c) =>
        c.client.id === (client as any) &&
        c.renter.id === (renter as any) &&
        c.rental.id === (rental as any),
    );
    return convListDataFiltered;
  }

  async findAllbyRenter(user_id: number): Promise<ConversationFormated[]> {
    const convData = await this.conversationRepository.find({
      where: { renter: { id: user_id } },
      order: { updated_at: 'DESC' },
    });
    const convDataFormated = convData.map((item) => ({
      id: item.id,
      created_at: item.created_at,
      updated_at: item.updated_at,
      client: {
        id: item.client.id,
        firstname: item.client.firstname,
        lastname: item.client.lastname,
      },
      renter: {
        id: item.renter.id,
        firstname: item.renter.firstname,
        lastname: item.renter.lastname,
      },
      rental: {
        id: item.rental.id,
      },
    }));
    return convDataFormated;
  }

  async findAllbyClient(user_id: number): Promise<ConversationFormated[]> {
    const convData = await this.conversationRepository.find({
      where: { client: { id: user_id } },
      order: { updated_at: 'DESC' },
    });
    const convDataFormated = convData.map((item) => ({
      id: item.id,
      created_at: item.created_at,
      updated_at: item.updated_at,
      client: {
        id: item.client.id,
        firstname: item.client.firstname,
        lastname: item.client.lastname,
      },
      renter: {
        id: item.renter.id,
        firstname: item.renter.firstname,
        lastname: item.renter.lastname,
      },
      rental: {
        id: item.rental.id,
      },
    }));
    return convDataFormated;
  }

  async findAllByRentals(rental_id: number): Promise<ConversationFormated[]> {
    const convData = await this.conversationRepository.find({
      where: { rental: { id: rental_id } },
    });
    const convDataFormated = convData.map((item) => ({
      id: item.id,
      created_at: item.created_at,
      updated_at: item.updated_at,
      client: {
        id: item.client.id,
        firstname: item.client.firstname,
        lastname: item.client.lastname,
      },
      renter: {
        id: item.renter.id,
        firstname: item.renter.firstname,
        lastname: item.renter.lastname,
      },
      rental: {
        id: item.rental.id,
      },
    }));
    return convDataFormated;
  }

  async create(
    convInfos: CreateConversationDto,
  ): Promise<ConversationFormated> {
    const newConv = await this.conversationRepository.insert(convInfos);
    const searchConv: Conversation = await this.conversationRepository.findOne(
      newConv.identifiers[0].id,
    );

    return {
      id: searchConv.id,
      created_at: searchConv.created_at,
      updated_at: searchConv.updated_at,
      client: {
        id: searchConv.client.id,
        firstname: searchConv.client.firstname,
        lastname: searchConv.client.lastname,
      },
      renter: {
        id: searchConv.renter.id,
        firstname: searchConv.renter.firstname,
        lastname: searchConv.renter.lastname,
      },
      rental: {
        id: searchConv.rental.id,
      },
    };
  }

  async delete(id: number): Promise<{ message: string }> {
    await this.conversationRepository.delete(id);
    return { message: `Conversation ${id} deleted` };
  }
}
