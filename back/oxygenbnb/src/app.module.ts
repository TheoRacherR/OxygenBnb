import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './tables/user/user.module';
import { UserInfoModule } from './tables/user-info/user-info.module';
import { RentalModule } from './tables/rental/rental.module';
import { RentalDateModule } from './tables/rental-date/rental-date.module';
import { ReservationModule } from './tables/reservation/reservation.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './tables/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UserModule,
    UserInfoModule,
    RentalModule,
    RentalDateModule,
    ReservationModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
