import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number ): Promise<Reservation> {
    const reservation = await this.reservationService.findOneById(id);
    if (reservation) return reservation;
    else throw new HttpException(`Reservation ${id} not found`, HttpStatus.NOT_FOUND);
  }

  @Get('client/:client_id')
  async findByClientId(@Param('client_id', ParseIntPipe) client_id: number ): Promise<Reservation[]> {
    const reservationOfThisClient = await this.reservationService.findByClientId(client_id);
    if(reservationOfThisClient) return reservationOfThisClient;
    else throw new HttpException(`No Reservation where found of the client ${client_id}`, HttpStatus.NOT_FOUND);
  }

  @Get('rental/:rental_id')
  async findByRentalId(@Param('rental_id', ParseIntPipe) rental_id: number ): Promise<Reservation[]> {
    const reservationOfThisClient = await this.reservationService.findByClientId(rental_id);
    if(reservationOfThisClient) return reservationOfThisClient;
    else throw new HttpException(`No Reservation where found of the rental ${rental_id}`, HttpStatus.NOT_FOUND);
  }

  @Post()
  async create(@Body() reservation: CreateReservationDto): Promise<Reservation> {
    return await this.reservationService.create(reservation);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() reservationUpdated: UpdateReservationDto): Promise<Reservation> {
    const reservation = await this.reservationService.findOneById(id);
    if(!reservation) throw new HttpException(`Reservation ${id} not found`, HttpStatus.NOT_FOUND)
    else return await this.reservationService.update(id, reservationUpdated);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<{ message: string}> {
    const reservationToDelete = await this.reservationService.findOneById(id);
    if (!reservationToDelete) throw new HttpException(`Reservation ${id} not found`, HttpStatus.NOT_FOUND);
    else return await this.reservationService.delete(id);
  }
}
