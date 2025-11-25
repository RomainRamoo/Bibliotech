import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let repository: jest.Mocked<any>

  const mockUserRepository = {
    find: jest.fn(),
  };

  const mockUsers = [
    { id: 1, username: "larthass" },
    { id: 2, username: "medneo" },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],  
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all users when promise resolves', async () => {
    repository.find.mockResolvedValue(mockUsers);

    const result = await service.getAllUsers();

    expect(repository.find).toHaveBeenCalled();
    expect(result).toEqual(mockUsers)
  });
});
