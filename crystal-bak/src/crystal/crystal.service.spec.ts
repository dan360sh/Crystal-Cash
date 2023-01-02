import { Test, TestingModule } from '@nestjs/testing';
import { CrystalService } from './crystal.service';

describe('CrystalService', () => {
  let service: CrystalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrystalService],
    }).compile();

    service = module.get<CrystalService>(CrystalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
