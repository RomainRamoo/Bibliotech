import { Test, TestingModule } from '@nestjs/testing';
import { VolumesService } from './volumes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Volume } from './volume.entity';
import { title } from 'process';


describe('VolumesService', () => {
  let service: VolumesService;
  let repository: jest.Mocked<any>;

  const mockVolumesRepository = {
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VolumesService,
        {
          provide: getRepositoryToken(Volume),
          useValue: mockVolumesRepository,
        },
      ],
    }).compile();

    service = module.get<VolumesService>(VolumesService);
    repository = module.get(getRepositoryToken(Volume));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return deleted volume when promise resolves', async () => {
    const mockVolume = { id: 1, title: 'Tome 1'};
    repository.findOne.mockResolvedValue(mockVolume);
    repository.delete.mockResolvedValue({ affected: 1 });

    const result = await service.deleteOneVolume(1);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 }});
    expect(repository.delete).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockVolume);
  })
});
