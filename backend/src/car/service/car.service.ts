import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';
import { CarRepository } from '../repository/car.repository';
import { CarInfoDto } from '../dto/car-info.dto';
import { User } from 'src/user/entity/user.entity';
import { Car } from '../entity/car.entity';
import { setAvailabilityDto } from '../dto/availability.dto';
import { toEntity } from '../../utils/transformDto';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(CarRepository)
    private carRepository: CarRepository,
  ) {}

  async addCar(car: CarInfoDto, user: User): Promise<Car> {
    return getConnection().transaction(async (transactionalEntityManager) => {
      return await this.carRepository.addCar(
        car,
        user,
        transactionalEntityManager,
      );
    });
  }

  async setAvailability(data: setAvailabilityDto): Promise<Car | null> {
    const { carId, availability } = data;
    const availabilityEntity = toEntity(availability);

    return getConnection().transaction(async (transactionalEntityManager) => {
      const result = await this.carRepository.setAvailability(
        carId,
        availabilityEntity,
        transactionalEntityManager,
      );

      return result;
    });
  }

  async getCars(userId: number): Promise<Car[]> {
    return getConnection().transaction(async (transactionalEntityManager) => {
      return await this.carRepository.getCars(
        userId,
        transactionalEntityManager,
      );
    });
  }
}
