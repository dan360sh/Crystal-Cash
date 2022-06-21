import { Test, TestingModule } from '@nestjs/testing';
import { FillingAdsService } from './filling-ads.service';

describe('FillingAdsService', () => {
  let service: FillingAdsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FillingAdsService],
    }).compile();

    service = module.get<FillingAdsService>(FillingAdsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
