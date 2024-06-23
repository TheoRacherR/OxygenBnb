import { Injectable } from '@nestjs/common';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { currency, Rental, rentalType } from './entities/rental.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export interface RentalFormated {
  id: number;
  default_currency: currency | null;
  default_price: number;
  isValid: boolean;
  active: boolean;
  // localisation_infos: string;
  // description: string;
  type: rentalType;
  title: string;
  owner: {
    id: number;
    firstname: string;
    lastname: string;
  };
}

@Injectable()
export class RentalService {
  constructor(
    @InjectRepository(Rental)
    private rentalRepository: Repository<Rental>,
  ) {}

  async findAll(): Promise<RentalFormated[]> {
    const rentalDataRaw = await this.rentalRepository.find();
    const rentalDataFormated: RentalFormated[] = rentalDataRaw
      .sort((a, b) => a.id - b.id)
      .map((item) => ({
        id: item.id,
        default_currency: item.default_currency,
        default_price: item.default_price,
        isValid: item.isValid,
        active: item.active,
        // localisation_infos: item.localisation_infos,
        // description: item.description,
        title: item.title,
        type: item.type,
        owner: {
          id: item.owner.id,
          firstname: item.owner.firstname,
          lastname: item.owner.lastname,
        },
      }));
    return rentalDataFormated;
  }

  async findOne(id: number): Promise<Rental> {
    const rentalData = await this.rentalRepository.findOne({
      where: {
        id,
      },
    });
    return rentalData;
  }

  async findAllByType(type: rentalType): Promise<RentalFormated[]> {
    const rentalDataRaw = await this.rentalRepository.find({
      where: {
        type: type,
      },
    });
    const rentalDataFormated: RentalFormated[] = rentalDataRaw
      .sort((a, b) => a.id - b.id)
      .map((item) => ({
        id: item.id,
        default_currency: item.default_currency,
        default_price: item.default_price,
        isValid: item.isValid,
        active: item.active,
        // localisation_infos: item.localisation_infos,
        // description: item.description,
        title: item.title,
        type: item.type,
        owner: {
          id: item.owner.id,
          firstname: item.owner.firstname,
          lastname: item.owner.lastname,
        },
      }));
    return rentalDataFormated;
  }

  async findAllByUserId(user_id: number): Promise<RentalFormated[]> {
    const rentalDataRaw = await this.rentalRepository.find({
      where: {
        owner: { id: user_id },
      },
    });
    const rentalDataFormated: RentalFormated[] = rentalDataRaw
      .sort((a, b) => a.id - b.id)
      .map((item) => ({
        id: item.id,
        default_currency: item.default_currency,
        default_price: item.default_price,
        isValid: item.isValid,
        active: item.active,
        // localisation_infos: item.localisation_infos,
        // description: item.description,
        title: item.title,
        type: item.type,
        owner: {
          id: item.owner.id,
          firstname: item.owner.firstname,
          lastname: item.owner.lastname,
        },
      }));
    return rentalDataFormated;
  }

  async getDataFromMyRentals(user_id: number): Promise<number> {
    const myRentalsLength = await this.rentalRepository.find({
      where: { owner: { id: user_id } },
    });
    return myRentalsLength.length;
  }

  async create(rentalInfos: CreateRentalDto): Promise<{ message: string }> {
    await this.rentalRepository.insert(rentalInfos);
    return { message: `Rental created` };
  }

  async update(
    id: number,
    rental: UpdateRentalDto,
  ): Promise<{ message: string }> {
    await this.rentalRepository.update(id, rental);
    return { message: `Rental ${id} updated` };
  }

  async delete(id: number): Promise<{ message: string }> {
    await this.rentalRepository.delete(id);
    return { message: `Rental ${id} deleted` };
  }
}
