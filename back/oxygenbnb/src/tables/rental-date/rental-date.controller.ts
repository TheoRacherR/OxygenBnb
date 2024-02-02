import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { RentalDateService } from './rental-date.service';
import { CreateRentalDateDto } from './dto/create-rental-date.dto';
import { UpdateRentalDateDto } from './dto/update-rental-date.dto';
import { RentalDate, rentalDateType } from './entities/rental-date.entity';

@Controller('rental-date')
export class RentalDateController {
  constructor(private readonly rentalDateService: RentalDateService) {}

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number): Promise<RentalDate> {
    const rentalDateFound = await this.rentalDateService.findOneById(id)
    return this.rentalDateService.findOneById(+id);
  }

  @Get('type/:type')
  async findAllByType(@Param('type') type: rentalDateType): Promise<RentalDate[]> {
    const rentalDateFoundByType = await this.rentalDateService.findAllByType(type)
    if(rentalDateFoundByType) return rentalDateFoundByType;
    else throw new HttpException(`No Rental date for type ${type} where found`, HttpStatus.NOT_FOUND);
  }

  @Get('rental/:rental_id')
  async findAllByRentalId(@Param('rental_id') rental_id: number): Promise<RentalDate[]> {
    const rentalDateFoundByRentalId = await this.rentalDateService.findAllByRentalId(rental_id)
    if(rentalDateFoundByRentalId) return rentalDateFoundByRentalId;
    else throw new HttpException(`No Rental date for rental_id ${rental_id} where found`, HttpStatus.NOT_FOUND);
  }

  @Post()
  async create(@Body() rentalDate: CreateRentalDateDto): Promise<{ message: string }> {
    return await this.rentalDateService.create(rentalDate);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() rentalDate: UpdateRentalDateDto): Promise<{ message: string }> {
    const rentalDateFoundById = await this.rentalDateService.findOneById(id);
    if(!rentalDateFoundById) throw new HttpException(`No Rental date ${id} where found`, HttpStatus.NOT_FOUND);
    else return await this.rentalDateService.update(id, rentalDate);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const rentalDateFoundById = await this.rentalDateService.findOneById(id);
    if(!rentalDateFoundById) throw new HttpException(`No Rental date ${id} where found`, HttpStatus.NOT_FOUND);
    else return await this.rentalDateService.delete(id);
  }
}
