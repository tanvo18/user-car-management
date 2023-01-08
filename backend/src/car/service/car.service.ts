import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, InsertResult } from 'typeorm';
import { CarRepository } from '../repository/car.repository';
import { CarInfoDto } from '../dto/car-info.dto';
import { User } from 'src/user/entity/user.entity';
import { Car } from '../entity/car.entity';
import { setAvailabilityDto } from '../dto/availability.dto';
import { toEntity } from '../../utils/transformDto';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';

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

  /**
   * NOTE: Using for loop to handle bulk insert
   * @param car
   * @param user
   * @returns Promise<string>
   */
  async addBulkCarByUsingForLoop(car: CarInfoDto, user: User): Promise<string> {
    for (let i = 0; i < 10; i++) {
      await this.addCar({ model: `${car.model}-${i}` }, user);
    }

    return 'Done';
  }

  /**
   * NOTE: Using createQueryBuilder insert to handle bulk insert
   * @param car
   * @param user
   * @returns Promise<string>
   */
  async addBulkCar(car: CarInfoDto, user: User): Promise<InsertResult> {
    return getConnection().transaction(async (transactionalEntityManager) => {
      const bulkCarInfos: CarInfoDto[] = [];

      for (let i = 0; i < 10; i++) {
        bulkCarInfos.push({ model: `${car.model}-${i}` });
      }

      const result = await this.carRepository.addBulkCar(
        bulkCarInfos,
        user,
        transactionalEntityManager,
      );

      return result;
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

  async getCarsPagination(
    userId: number,
    options: IPaginationOptions,
  ): Promise<Pagination<Car>> {
    return getConnection().transaction(async (transactionalEntityManager) => {
      return await this.carRepository.getCarsPagination(
        userId,
        options,
        transactionalEntityManager,
      );
    });
  }
}
