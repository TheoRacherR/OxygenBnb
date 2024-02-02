import { Module } from '@nestjs/common';
import { RentalDateService } from './rental-date.service';
import { RentalDateController } from './rental-date.controller';

@Module({
  controllers: [RentalDateController],
  providers: [RentalDateService],
})
export class RentalDateModule {}
