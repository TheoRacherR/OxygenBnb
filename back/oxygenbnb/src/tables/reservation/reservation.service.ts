import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { currency, rentalType } from '../rental/entities/rental.entity';

export interface ReservationFormated {
  id: number;
  start_date: Date;
  end_date: Date;
  canceled: boolean;
  nb_adult: number;
  nb_children: number;
  price_per_night: number;
  total_fees: number;
  total_price: number;
  created_at: Date;
  updated_at: Date;
  nb_night: number;
  client: {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
  };
  rental: {
    id: number;
    default_price: number;
    default_currency: currency;
    type: rentalType;
    title: string;
    description: string;
    isValid: boolean;
    active: boolean;
  };
}

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  async findAll(): Promise<ReservationFormated[]> {
    const reservationDataRaw = await this.reservationRepository.find();
    const reservationDataFormated: ReservationFormated[] =
      reservationDataRaw.map((item) => ({
        id: item.id,
        start_date: item.start_date,
        end_date: item.end_date,
        canceled: item.canceled,
        nb_adult: item.nb_adult,
        nb_children: item.nb_children,
        price_per_night: item.price_per_night,
        total_fees: item.total_fees,
        total_price: item.total_price,
        created_at: item.created_at,
        updated_at: item.updated_at,
        nb_night: item.nb_night,
        client: {
          id: item.client.id,
          email: item.client.email,
          firstname: item.client.firstname,
          lastname: item.client.lastname,
        },
        rental: {
          id: item.rental.id,
          default_price: item.rental.default_price,
          default_currency: item.rental.default_currency,
          type: item.rental.type,
          title: item.rental.title,
          description: item.rental.description,
          isValid: item.rental.isValid,
          active: item.rental.active,
        },
      }));
    return reservationDataFormated;
  }

  async findOneById(id: number): Promise<Reservation> {
    const reservationRaw = await this.reservationRepository.findOne({
      where: {
        id,
      },
    });
    return reservationRaw;
  }

  async findByClientId(client_id: number): Promise<ReservationFormated[]> {
    const reservationDataRaw = await this.reservationRepository.find({
      where: {
        client: { id: client_id },
      },
    });
    const reservationDataFormated: ReservationFormated[] =
      reservationDataRaw.map((item) => ({
        id: item.id,
        start_date: item.start_date,
        end_date: item.end_date,
        canceled: item.canceled,
        nb_adult: item.nb_adult,
        nb_children: item.nb_children,
        price_per_night: item.price_per_night,
        total_fees: item.total_fees,
        total_price: item.total_price,
        created_at: item.created_at,
        updated_at: item.updated_at,
        nb_night: item.nb_night,
        client: {
          id: item.client.id,
          email: item.client.email,
          firstname: item.client.firstname,
          lastname: item.client.lastname,
        },
        rental: {
          id: item.rental.id,
          default_price: item.rental.default_price,
          default_currency: item.rental.default_currency,
          type: item.rental.type,
          title: item.rental.title,
          description: item.rental.description,
          isValid: item.rental.isValid,
          active: item.rental.active,
        },
      }));
    return reservationDataFormated;
  }

  async findByRentalId(rental_id: number): Promise<ReservationFormated[]> {
    const reservationDataRaw = await this.reservationRepository.find({
      where: {
        rental: { id: rental_id },
      },
    });
    const reservationDataFormated: ReservationFormated[] =
      reservationDataRaw.map((item) => ({
        id: item.id,
        start_date: item.start_date,
        end_date: item.end_date,
        canceled: item.canceled,
        nb_adult: item.nb_adult,
        nb_children: item.nb_children,
        price_per_night: item.price_per_night,
        total_fees: item.total_fees,
        total_price: item.total_price,
        created_at: item.created_at,
        updated_at: item.updated_at,
        nb_night: item.nb_night,
        client: {
          id: item.client.id,
          email: item.client.email,
          firstname: item.client.firstname,
          lastname: item.client.lastname,
        },
        rental: {
          id: item.rental.id,
          default_price: item.rental.default_price,
          default_currency: item.rental.default_currency,
          type: item.rental.type,
          title: item.rental.title,
          description: item.rental.description,
          isValid: item.rental.isValid,
          active: item.rental.active,
        },
      }));
    return reservationDataFormated;
  }

  async getNumberOfResaOfMyRentals(
    user_id: number,
  ): Promise<{ total: number; unique: number }> {
    const myReservationOfMyRentals = await this.reservationRepository.find({
      where: { client: { id: user_id } },
    });
    const uniqueArray = [];
    for (let i = 0; i < myReservationOfMyRentals.length; i++) {
      const element = myReservationOfMyRentals[i];
      if (!uniqueArray.includes(element.client.id)) uniqueArray.push(element);
    }
    return {
      total: myReservationOfMyRentals.length,
      unique: uniqueArray.length,
    };
  }

  async create(
    reservation: CreateReservationDto,
  ): Promise<{ message: string }> {
    await this.reservationRepository.insert(reservation);
    return { message: `Reservation created` };
  }

  async update(
    id: number,
    reservation: UpdateReservationDto,
  ): Promise<{ message: string }> {
    await this.reservationRepository.update(id, reservation);
    return { message: `Reservation ${id} updated` };
  }

  async delete(id: number): Promise<{ message: string }> {
    await this.reservationRepository.delete(id);
    return { message: `Reservation ${id} deleted` };
  }
}
