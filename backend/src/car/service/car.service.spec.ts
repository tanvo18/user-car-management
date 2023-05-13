import { Test } from '@nestjs/testing';
import { Car } from '../entity/car.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CarService } from './car.service';
import { CarStatus } from '../../availability/entity/availability.entity';
import { toEntity } from '../../utils/transformDto';
import { CarRepository } from '../repository/car.repository';

const availability = {
  date: new Date('2022-05-16'),
  price: 5000,
  status: CarStatus.AVAILABLE,
};
const availabilityEntity = toEntity(availability);
const mockResult = [
  {
    id: 1,
    model: 'Mercedes E200',
    availabilities: [availabilityEntity],
  },
] as Car[];

describe('Test Car service', () => {
  let carService: CarService;
  let carRepository: CarRepository;
  const CAR_REPOSITORY_TOKEN = getRepositoryToken(Car);

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CarService,
        {
          provide: CAR_REPOSITORY_TOKEN,
          useValue: {
            getCars: jest.fn().mockReturnValue(mockResult),
          },
        },
      ],
    }).compile();

    carService = module.get<CarService>(CarService);
    carRepository = module.get<CarRepository>(CAR_REPOSITORY_TOKEN);
  });

  it('Car service should be defined', () => {
    expect(carService).toBeDefined();
  });

  it('Car repository should be defined', () => {
    expect(carRepository).toBeDefined();
  });

  describe('getCars', () => {
    it('should return an array of cars', async () => {
      expect(await carService.getCars(1)).toBe(mockResult);
    });
  });
});
