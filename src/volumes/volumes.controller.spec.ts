import { Test, TestingModule } from '@nestjs/testing';
import { VolumesController } from './volumes.controller';

describe('VolumesController', () => {
  let controller: VolumesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VolumesController],
    }).compile();

    controller = module.get<VolumesController>(VolumesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
