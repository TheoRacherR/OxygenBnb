import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }


  @Get(":id")
  async findOneById(@Param("id", ParseIntPipe) id: number): Promise<User> {
    const user = await this.userService.findOneById(id);
    if (user) return user;
    else throw new HttpException("User not found", HttpStatus.NOT_FOUND);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<{ message: string }> {
    return await this.userService.create(createUserDto);
  }

  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<{ message: string }> {
    const userToUpdate = await this.userService.findOneById(id);
    if (!userToUpdate)
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    else return await this.userService.update(id, updateUserDto);
  }

  // @Patch("role/:id")
  // async updateRole(
  //   @Param("id", ParseIntPipe) id: number,
  //   @Body() role: userRole
  // ): Promise<User> {
  //   const userRoleToUpdate = await this.userService.findOneById(id);
  //   if (!userRoleToUpdate)
  //     throw new HttpException("User not found", HttpStatus.NOT_FOUND);
  //   /*else if (user !== "admin") return await this.userService.updateRole(id, role);*/
  //   else return await this.userService.updateRole(id, role);
  // }

  @Delete(":id")
  async delete(
    @Param("id", ParseIntPipe) id: number
  ): Promise<{ message: string }> {
    const userToDelete = await this.userService.findOneById(id);
    if (!userToDelete)
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    else return await this.userService.delete(id);
  }

}
