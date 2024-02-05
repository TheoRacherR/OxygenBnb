import { Injectable } from '@nestjs/common';
import { CreateRentalDateDto } from './dto/create-rental-date.dto';
import { UpdateRentalDateDto } from './dto/update-rental-date.dto';
import { RentalDate, rentalDateType } from './entities/rental-date.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RentalDateService {
  constructor(
    @InjectRepository(RentalDate)
    private rentalDateRepository: Repository<RentalDate>
  ) {}

  async findAllByType(type: rentalDateType): Promise<RentalDate[]> {
    return await this.rentalDateRepository.find({
      where: {
        type: type,
      },
    })
  }

  async findAllByRentalId(rental_id: number): Promise<RentalDate[]> {
    return await this.rentalDateRepository.find({
      where: {
        rental: { id: rental_id },
      },
    });
  }

  async findOneById(id: number): Promise<RentalDate> {
    return await this.rentalDateRepository.findOne({
      where: {
        id,
      },
    });
  }

  async create(rentalDate: CreateRentalDateDto): Promise<{ message: string}> {
    const newRentalDate = this.rentalDateRepository.create(rentalDate);
    return { message: "RentalDate created"};
  }

  async update(id: number, rentalDate: UpdateRentalDateDto): Promise<{ message: string}> {
    await this.rentalDateRepository.update(id, rentalDate);
    return { message: `RentalDate ${id} updated` }
  }

  async delete(id: number): Promise<{ message: string}> {
    await this.rentalDateRepository.delete(id);
    return { message: `RentalDate ${id} deleted` };
  }
}
