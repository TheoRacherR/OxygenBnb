import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationFormated } from './reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  async findAll(): Promise<ReservationFormated[]> {
    return await this.reservationService.findAll();
  }

  @Get(':id')
  async findOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReservationFormated> {
    const reservation = await this.reservationService.findOneById(id);
    if (reservation)
      return {
        id: id,
        start_date: reservation.start_date,
        end_date: reservation.end_date,
        canceled: reservation.canceled,
        nb_adult: reservation.nb_adult,
        nb_children: reservation.nb_children,
        price_per_night: reservation.price_per_night,
        total_fees: reservation.total_fees,
        total_price: reservation.total_price,
        created_at: reservation.created_at,
        updated_at: reservation.updated_at,
        nb_night: reservation.nb_night,
        client: {
          id: reservation.client.id,
          email: reservation.client.email,
          firstname: reservation.client.firstname,
          lastname: reservation.client.lastname,
        },
        rental: {
          id: reservation.rental.id,
          default_price: reservation.rental.default_price,
          default_currency: reservation.rental.default_currency,
          type: reservation.rental.type,
          localisation_infos: reservation.rental.localisation_infos,
          isValid: reservation.rental.isValid,
          active: reservation.rental.active,
        },
      };
    else
      throw new HttpException(
        `Reservation ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
  }

  @Get('client/:client_id')
  async findByClientId(
    @Param('client_id', ParseIntPipe) client_id: number,
  ): Promise<ReservationFormated[]> {
    const reservationOfThisClient =
      await this.reservationService.findByClientId(client_id);
    if (reservationOfThisClient) return reservationOfThisClient;
    else
      throw new HttpException(
        `No Reservation where found of the client ${client_id}`,
        HttpStatus.NOT_FOUND,
      );
  }

  @Get('rental/:rental_id')
  async findByRentalId(
    @Param('rental_id', ParseIntPipe) rental_id: number,
  ): Promise<ReservationFormated[]> {
    const reservationOfThisClient =
      await this.reservationService.findByRentalId(rental_id);
    if (reservationOfThisClient) return reservationOfThisClient;
    else
      throw new HttpException(
        `No Reservation where found of the rental ${rental_id}`,
        HttpStatus.NOT_FOUND,
      );
  }

  @Post()
  async create(
    @Body() reservation: CreateReservationDto,
  ): Promise<{ message: string }> {
    return await this.reservationService.create(reservation);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() reservationUpdated: UpdateReservationDto,
  ): Promise<{ message: string }> {
    const reservation = await this.reservationService.findOneById(id);
    if (!reservation)
      throw new HttpException(
        `Reservation ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    else return await this.reservationService.update(id, reservationUpdated);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    const reservationToDelete = await this.reservationService.findOneById(id);
    if (!reservationToDelete)
      throw new HttpException(
        `Reservation ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    else return await this.reservationService.delete(id);
  }
}
