import { Test, TestingModule } from '@nestjs/testing';
import { UrlFillingController } from './url-filling.controller';

describe('UrlFillingController', () => {
  let controller: UrlFillingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlFillingController],
    }).compile();

    controller = module.get<UrlFillingController>(UrlFillingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
