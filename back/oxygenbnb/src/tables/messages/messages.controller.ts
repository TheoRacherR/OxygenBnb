import { Get, Param, ParseIntPipe } from '@nestjs/common';
import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { MessageFormated, MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-messages.dto';

@Controller('message')
export class MessagesController {
  constructor(private readonly messageService: MessagesService) {}

  @Get('/last/:conv_id')
  async findLastMessageFromAConversation(
    @Param('conv_id', ParseIntPipe) conv_id: number,
  ): Promise<MessageFormated> {
    const lastMessage =
      await this.messageService.findLastMessageFromAConversation(conv_id);
    if (lastMessage) return lastMessage;
    else
      throw new HttpException(
        `No Conversation for id ${conv_id} where found`,
        HttpStatus.NOT_FOUND,
      );
  }

  @Get('/:conv_id/limit/:limit')
  async findLimitedFromConversation(
    @Param('conv_id', ParseIntPipe) conv_id: number,
    @Param('limit', ParseIntPipe) limit: number,
  ): Promise<MessageFormated[]> {
    return await this.messageService.findLimitedFromConversation(
      conv_id,
      limit,
    );
  }

  @Post()
  async create(
    @Body() messageInfos: CreateMessageDto,
  ): Promise<{ message: string }> {
    return this.messageService.create(messageInfos);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    const messageToDelete = await this.messageService.findOne(id);
    if (!messageToDelete)
      throw new HttpException(
        `No Message ${id} where found`,
        HttpStatus.NOT_FOUND,
      );
    else return await this.messageService.delete(id);
  }
}
