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
import { RentalService, RentalFormated } from './rental.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { Rental, rentalType } from './entities/rental.entity';

@Controller('rental')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Get()
  async findAll(): Promise<RentalFormated[]> {
    return await this.rentalService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Rental> {
    const rental = await this.rentalService.findOne(id);
    if (rental) return rental;
    else
      throw new HttpException(
        `No Rental for id ${id} where found`,
        HttpStatus.NOT_FOUND,
      );
  }

  @Get('owner/:user_id')
  async findAllByUserId(
    @Param('user_id', ParseIntPipe) user_id: number,
  ): Promise<RentalFormated[]> {
    const rentals = await this.rentalService.findAllByUserId(user_id);
    if (rentals) return rentals;
    else
      throw new HttpException(
        `No Rental for user ${user_id} where found`,
        HttpStatus.NOT_FOUND,
      );
  }

  @Get('type/:type')
  async findAllByType(
    @Param('type') type: rentalType,
  ): Promise<RentalFormated[]> {
    const rentals = await this.rentalService.findAllByType(type);
    if (rentals) return rentals;
    else
      throw new HttpException(
        `No Rental for type ${type} where found`,
        HttpStatus.NOT_FOUND,
      );
  }

  @Get('data/:user_id')
  async getDataFromMyRentals(
    @Param('user_id', ParseIntPipe) user_id: number,
  ): Promise<number> {
    return await this.rentalService.getDataFromMyRentals(user_id);
  }

  @Post()
  async create(@Body() rental: CreateRentalDto): Promise<{ message: string }> {
    return this.rentalService.create(rental);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() rental: UpdateRentalDto,
  ): Promise<{ message: string }> {
    const rentalToUpdate = await this.rentalService.findOne(id);
    if (!rentalToUpdate)
      throw new HttpException(
        `No Rental ${id} where found`,
        HttpStatus.NOT_FOUND,
      );
    else return await this.rentalService.update(id, rental);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    const rentalToUpdate = await this.rentalService.findOne(id);
    if (!rentalToUpdate)
      throw new HttpException(
        `No Rental ${id} where found`,
        HttpStatus.NOT_FOUND,
      );
    else return await this.rentalService.delete(id);
  }
}
