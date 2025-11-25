import { Test, TestingModule } from '@nestjs/testing';
import { SeriesController } from './series.controller';
import { SeriesService } from './series.service';
import { VolumesService } from 'src/volumes/volumes.service';


describe('SeriesController', () => {
  let controller: SeriesController;
  let service: SeriesService;
  let volumesService: VolumesService;

  const mockSeriesService = {
    getAllSeries: jest.fn(),
  };

  const mockVolumesService = {
    getVolumesBySerie: jest.fn(),
    deleteOneVolume: jest.fn(),
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeriesController],
      providers: [
        {
          provide: SeriesService,
          useValue: mockSeriesService,
        },
        {
          provide: VolumesService,
          useValue: mockVolumesService
        },
      ],
  }).compile();

    controller = module.get<SeriesController>(SeriesController);
    service = module.get<SeriesService>(SeriesService);
    volumesService = module.get<VolumesService>(VolumesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all series', async () => {
    const mockResult = [
      { id: 1, title: "Blacksad" },
      { id: 2, title: "One Piece" },
    ];

    mockSeriesService.getAllSeries.mockResolvedValue(mockResult);

    const result = await controller.getAllSeries();

    expect(service.getAllSeries).toHaveBeenCalled();
    expect(result).toEqual(mockResult);
  });

  it('should delete one volume of a serie', async () => {
    const mockResult = [
      { id: 1, volume_number:1 },
    ];

    mockVolumesService.deleteOneVolume.mockResolvedValue(mockResult);

    const result = await controller.deleteOneVolume(1, 1);

    expect(volumesService.deleteOneVolume).toHaveBeenCalledWith(1, 1);
    expect(result).toEqual(mockResult);
  });
  
});
