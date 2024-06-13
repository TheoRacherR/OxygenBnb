import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersFormated } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UsersFormated[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this.userService.findOneById(id);
    if (user) return user;
    else throw new HttpException(`User ${id} not found`, HttpStatus.NOT_FOUND);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<{ message: string }> {
    const userToUpdate = await this.userService.findOneById(id);
    if (!userToUpdate)
      throw new HttpException(`User ${id} not found`, HttpStatus.NOT_FOUND);
    else return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    const userToDelete = await this.userService.findOneById(id);
    if (!userToDelete)
      throw new HttpException(`User ${id} not found`, HttpStatus.NOT_FOUND);
    else return await this.userService.delete(id);
  }
}
