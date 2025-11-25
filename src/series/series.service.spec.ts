import { Test, TestingModule } from '@nestjs/testing';
import { SeriesService } from './series.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Serie } from './serie.entity';


describe('SeriesService', () => {
  let service: SeriesService;
  let repository: jest.Mocked<any>

  const mockSeriesRepository = {
  find: jest.fn(),
};

const mockSeries = [
  { id: 1, title: 'Blacksad' },
  { id: 2, title: 'One Piece' },
];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeriesService,
        {
          provide: getRepositoryToken(Serie),
          useValue: mockSeriesRepository,
        },
      ],
    }).compile();

    service = module.get<SeriesService>(SeriesService);
    repository = module.get(getRepositoryToken(Serie));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all series when promise resolves', async () => {
    repository.find.mockResolvedValue(mockSeries);

    const result = await service.getAllSeries();

    expect(repository.find).toHaveBeenCalled();
    expect(result).toEqual(mockSeries);

  });
});
