import { Module } from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { UserInfoController } from './user-info.controller';
import { UserInfo } from './entities/user-info.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserInfo])],
  controllers: [UserInfoController],
  providers: [UserInfoService],

  exports: [UserInfoService],
})
export class UserInfoModule {}
