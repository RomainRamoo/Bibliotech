import { Test, TestingModule } from '@nestjs/testing';
import { SeriesController } from './series.controller';
import { SeriesService } from './series.service';
import { VolumesService } from 'src/volumes/volumes.service';


describe('SeriesController', () => {
  let controller: SeriesController;
  let service: SeriesService;

  const mockSeriesService = {
    getAllSeries: jest.fn(),
  };

  const mockVolumesService = {
    getVolumesBySerie: jest.fn(),
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
});
