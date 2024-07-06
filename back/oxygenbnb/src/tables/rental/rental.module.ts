import { Module } from '@nestjs/common';
import { RentalService } from './rental.service';
import { RentalController } from './rental.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from './entities/rental.entity';
// import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rental]),
    // MulterModule.register({
    //   dest: './uploads',
    // }),
  ],
  controllers: [RentalController],
  providers: [RentalService],
})
export class RentalModule {}
