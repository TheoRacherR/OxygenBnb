import { IsNotEmpty, IsNumber } from 'class-validator';

export class SearchRentalDto {
  @IsNumber()
  @IsNotEmpty()
  northEastLat: number;

  @IsNumber()
  @IsNotEmpty()
  northEastLng: number;

  @IsNumber()
  @IsNotEmpty()
  southWestLat: number;

  @IsNumber()
  @IsNotEmpty()
  southWestLng: number;
}
