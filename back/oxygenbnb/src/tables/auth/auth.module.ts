import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserInfoModule } from '../user-info/user-info.module';
import { UserInfo } from '../user-info/entities/user-info.entity';

@Module({
  imports: [
    UserModule,
    UserInfoModule,
    JwtModule,
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([UserInfo]),
    JwtModule.register({
      global: true,
      secret: `${process.env.jwt_secret}`,
      signOptions: { expiresIn: '300s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
