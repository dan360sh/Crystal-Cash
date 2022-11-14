import { Test, TestingModule } from '@nestjs/testing';
import { UrlFillingService } from './url-filling.service';

describe('UrlFillingService', () => {
  let service: UrlFillingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrlFillingService],
    }).compile();

    service = module.get<UrlFillingService>(UrlFillingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
