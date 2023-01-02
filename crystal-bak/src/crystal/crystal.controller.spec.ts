import { Test, TestingModule } from '@nestjs/testing';
import { CrystalController } from './crystal.controller';

describe('CrystalController', () => {
  let controller: CrystalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrystalController],
    }).compile();

    controller = module.get<CrystalController>(CrystalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
