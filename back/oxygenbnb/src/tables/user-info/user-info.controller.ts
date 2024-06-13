import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { UserInfo } from './entities/user-info.entity';

@Controller('user-info')
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) {}

  @Get(':user_id')
  async findOneByUserId(
    @Param('user_id', ParseIntPipe) user_id: number,
  ): Promise<UserInfo> {
    const userInfo = await this.userInfoService.findOneByUserId(user_id);
    if (userInfo) return userInfo;
    else
      throw new HttpException(
        `User info not found for user ${user_id}`,
        HttpStatus.NOT_FOUND,
      );
  }

  @Patch('user/:user_id')
  async update(
    @Param('user_id', ParseIntPipe) user_id: number,
    @Body() userInfo: UpdateUserInfoDto,
  ): Promise<{ message: string }> {
    const userInfoToUpdate =
      await this.userInfoService.findOneByUserId(user_id);
    if (!userInfoToUpdate)
      throw new HttpException(
        `User info not found for user ${user_id}`,
        HttpStatus.NOT_FOUND,
      );
    else return await this.userInfoService.update(user_id, userInfo);
  }
}
