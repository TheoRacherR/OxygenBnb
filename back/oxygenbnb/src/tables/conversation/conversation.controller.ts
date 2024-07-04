import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  ConversationFormated,
  ConversationService,
} from './conversation.service';
import { CreateConversationDto } from './dto/create-discussion.dto';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ConversationFormated> {
    const conversation = await this.conversationService.findOne(id);
    if (conversation) return conversation;
    else
      throw new HttpException(
        `No Conversation for id ${id} where found`,
        HttpStatus.NOT_FOUND,
      );
  }

  @Get('/client/:user_id')
  async findAllbyClient(
    @Param('user_id', ParseIntPipe) user_id: number,
  ): Promise<ConversationFormated[]> {
    return await this.conversationService.findAllbyClient(user_id);
  }

  @Get('/renter/:user_id')
  async findAllbyRenter(
    @Param('user_id', ParseIntPipe) user_id: number,
  ): Promise<ConversationFormated[]> {
    return await this.conversationService.findAllbyRenter(user_id);
  }

  @Get('/rental/:rental_id')
  async findAllByRentals(
    @Param('rental_id', ParseIntPipe) rental_id: number,
  ): Promise<ConversationFormated[]> {
    return await this.conversationService.findAllByRentals(rental_id);
  }

  @Post()
  async create(
    @Body() convInfos: CreateConversationDto,
  ): Promise<ConversationFormated> {
    try {
      const searchConv =
        await this.conversationService.findAllForClientAndRenter(
          convInfos.client,
          convInfos.renter,
          convInfos.rental,
        );
      if (searchConv.length > 0) return searchConv[0];
      // return { message: 'Conversation already exist' };
      // throw new HttpException(
      //   'Conversation already exist',
      //   HttpStatus.CONFLICT,
      // );
      else {
        return this.conversationService.create(convInfos);
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    const conversationToDelete = await this.conversationService.findOne(id);
    if (!conversationToDelete)
      throw new HttpException(
        `No Conversation ${id} where found`,
        HttpStatus.NOT_FOUND,
      );
    else return await this.conversationService.delete(id);
  }
}
