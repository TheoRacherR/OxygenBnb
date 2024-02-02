import { rentalDateType } from "../entities/rental-date.entity"
import { rentalDateMock } from "./rental-date.mock"

export class RentalDateServiceMock {
  findAllByType = jest.fn().mockImplementation((type: rentalDateType) => {
    return Promise.resolve(rentalDateMock.find(rd => rd.type === type))
  });
  findAllByRentalId = jest.fn().mockImplementation((rental_id: number) => {
    return Promise.resolve(rentalDateMock.find(rd => rd.rental.id === rental_id))
  });
  findOneById = jest.fn().mockImplementation((id: number) => {
    return Promise.resolve(rentalDateMock.find(rd => rd.id === id))
  });

  create = jest.fn().mockResolvedValue({ message: "RentalDate created" })
  update = jest.fn().mockResolvedValue({ message: `RentalDate 1 updated`})
  delete = jest.fn().mockResolvedValue({ message: `RentalDate 1 deleted`})
}