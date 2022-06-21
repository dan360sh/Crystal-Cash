import { Test, TestingModule } from '@nestjs/testing';
import { FillingAdsController } from './filling-ads.controller';

describe('FillingAdsController', () => {
  let controller: FillingAdsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FillingAdsController],
    }).compile();

    controller = module.get<FillingAdsController>(FillingAdsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
