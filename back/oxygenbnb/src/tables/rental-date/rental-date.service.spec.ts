import { Test, TestingModule } from '@nestjs/testing';
import { RentalDateService } from './rental-date.service';

describe('RentalDateService', () => {
  let service: RentalDateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RentalDateService],
    }).compile();

    service = module.get<RentalDateService>(RentalDateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
