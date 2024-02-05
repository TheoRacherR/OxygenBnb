import { Injectable } from '@nestjs/common';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { Rental, rentalType } from './entities/rental.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RentalService {
  constructor(
    @InjectRepository(Rental)
    private rentalRepository: Repository<Rental>
  ) {}
  
  async findOne(id: number): Promise<Rental> {
    return await this.rentalRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findAllByType(type: rentalType): Promise<Rental[]>{
    return await this.rentalRepository.find({
      where: {
        type: type,
      },
    });
  }

  async findAllByUserId(user_id: number): Promise<Rental[]>{
    return await this.rentalRepository.find({
      where: {
        owner: { id: user_id },
      },
    });
  }

  async create(rental: CreateRentalDto): Promise<{ message: string}> {
    const newRental = this.rentalRepository.create(rental);
    return { message: `Rental created` }
  }

  async update(id: number, rental: UpdateRentalDto): Promise<{ message: string}> {
    await this.rentalRepository.update(id, rental);
    return { message: `Rental ${id} updated` }
  }

  async delete(id: number): Promise<{ message: string}> {
    await this.rentalRepository.delete(id);
    return { message: `Rental ${id} deleted` };
  }
}
