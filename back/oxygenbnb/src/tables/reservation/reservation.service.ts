import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>
  ) {}
  
  async findOneById(id: number): Promise<Reservation> {
    return await this.reservationRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findByClientId(client_id: number): Promise<Reservation[]> {
    return await this.reservationRepository.find({
      where: {
        client: { id: client_id },
      },
    });
  }

  async findByRentalId(rental_id: number): Promise<Reservation[]> {
    return await this.reservationRepository.find({
      where: {
        rental: { id: rental_id },
      },
    });
  }

  async create(reservation: CreateReservationDto): Promise<{ message: string }> {
    const newReservation = this.reservationRepository.create(reservation);
    return { message: `Reservation created` };
  }

  async update(id: number, reservation: UpdateReservationDto): Promise<{ message: string }> {
    await this.reservationRepository.update(id, reservation);
    return { message: `Reservation ${id} updated` };
  }

  async delete(id: number): Promise<{ message: string }> {
    await this.reservationRepository.delete(id);
    return { message: `Reservation ${id} deleted` };
  }
}
