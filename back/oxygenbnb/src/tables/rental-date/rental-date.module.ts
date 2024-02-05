import { Module } from '@nestjs/common';
import { RentalDateService } from './rental-date.service';
import { RentalDateController } from './rental-date.controller';
import { RentalDate } from './entities/rental-date.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RentalDate])],
  controllers: [RentalDateController],
  providers: [RentalDateService],
})
export class RentalDateModule {}
