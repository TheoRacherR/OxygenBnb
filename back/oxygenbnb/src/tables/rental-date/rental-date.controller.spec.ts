import { Test, TestingModule } from '@nestjs/testing';
import { RentalDateController } from './rental-date.controller';
import { RentalDateService } from './rental-date.service';

describe('RentalDateController', () => {
  let controller: RentalDateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentalDateController],
      providers: [RentalDateService],
    }).compile();

    controller = module.get<RentalDateController>(RentalDateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
