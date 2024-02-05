import { rentalType } from "../entities/rental.entity";
import { rentalMock } from "./rental.mock"

export class RentalServiceMock {
  findOne = jest.fn().mockImplementation((id: number) => {
    return Promise.resolve(rentalMock.find(rental => rental.id === id))
  });
  findAllByUserId = jest.fn().mockImplementation((user_id: number) => {
    return Promise.resolve(rentalMock.find(rental => rental.owner.id === user_id))
  });
  findAllByType = jest.fn().mockImplementation((type: rentalType) => {
    return Promise.resolve(rentalMock.find(rental => rental.type === type))
  });
  create = jest.fn().mockResolvedValue({ message: `Rental created` });
  update = jest.fn().mockResolvedValue({ message: `Rental 1 updated` });
  delete = jest.fn().mockResolvedValue({ message: `Rental 1 deleted` });
}

