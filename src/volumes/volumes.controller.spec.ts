import { Test, TestingModule } from '@nestjs/testing';
import { VolumesController } from './volumes.controller';
import { VolumesService } from './volumes.service';

describe('VolumesController', () => {
  let controller: VolumesController;
  let service: VolumesService;

  const mockVolumesService = {
    deleteOneVolume: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VolumesController],
      providers: [
        {
          provide: VolumesService,
          useValue: mockVolumesService,
        },
      ],
    }).compile();

    controller = module.get<VolumesController>(VolumesController);
    service = module.get<VolumesService>(VolumesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should delete one volume of a serie', async () => {
    const mockResult = [
      { id: 1, volume_number:1 },
    ];

    mockVolumesService.deleteOneVolume.mockResolvedValue(mockResult);

    const result = await controller.deleteOneVolume(1);

    expect(service.deleteOneVolume).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockResult);
  });
});
