import {
  EntityRepository,
  Repository,
  EntityManager,
  InsertResult,
} from 'typeorm';
import { Car } from '../entity/car.entity';
import { CarInfoDto } from '../dto/car-info.dto';
import { User } from 'src/user/entity/user.entity';
import { Availability } from 'src/availability/entity/availability.entity';
import { Logger } from '@nestjs/common';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@EntityRepository(Car)
export class CarRepository extends Repository<Car> {
  async addCar(
    car: CarInfoDto,
    user: User,
    transactionalEntityManager: EntityManager,
  ): Promise<Car> {
    const newCar = new Car();
    newCar.model = car.model;
    newCar.user = user;

    return await transactionalEntityManager.getRepository(Car).save(newCar);
  }

  async addBulkCar(
    carInfos: CarInfoDto[],
    user: User,
    transactionalEntityManager: EntityManager,
  ): Promise<InsertResult> {
    const cars = [];
    carInfos.forEach((carInfo) => {
      const newCar = new Car();
      newCar.model = carInfo.model;
      newCar.user = user;

      cars.push(newCar);
    });

    const result = await transactionalEntityManager
      .createQueryBuilder()
      .insert()
      .into(Car)
      .values(cars)
      .execute();

    return result;
  }

  async setAvailability(
    carId: number,
    availability: Availability,
    transactionalEntityManager: EntityManager,
  ): Promise<Car | null> {
    const car = await this.findOne({
      where: { id: carId },
      relations: ['availabilities'],
    });

    if (!car) {
      return null;
    }

    const existingAvailability: Availability = car.availabilities.find(
      (existingAvailability) => existingAvailability.date === availability.date,
    );

    // NOTE: we have 2 cases:
    // 1. If availability existed => update record
    // 2. If availability is new => create a new record
    if (existingAvailability) {
      for (const key in availability) {
        existingAvailability[key] = availability[key];
      }
    } else {
      car.availabilities.push(availability);
    }

    return await transactionalEntityManager.getRepository(Car).save(car);
  }

  async getCars(
    userId: number,
    transactionalEntityManager: EntityManager,
  ): Promise<Car[]> {
    // NOTE: Using repository methods to query
    // return await transactionalEntityManager.getRepository(Car).find({
    //   where: { user: { id: userId } },
    //   relations: ['availabilities'],
    // });

    // TODO: try to use raw query with typeorm

    // NOTE: Using queryBuilder
    const result = await transactionalEntityManager
      .getRepository(Car)
      .createQueryBuilder('car')
      .leftJoinAndSelect('car.user', 'user')
      .leftJoinAndSelect('car.availabilities', 'availability')
      .where('user.id = :id', { id: userId })
      .getMany();

    return result;
  }

  async getCarsPagination(
    userId: number,
    options: IPaginationOptions,
    transactionalEntityManager: EntityManager,
  ): Promise<Pagination<Car>> {
    // NOTE: Using queryBuilder
    const queryBuilder = await transactionalEntityManager
      .getRepository(Car)
      .createQueryBuilder('car')
      .leftJoinAndSelect('car.user', 'user')
      .leftJoinAndSelect('car.availabilities', 'availability')
      .where('user.id = :id', { id: userId })
      .orderBy('car.id');

    return paginate<Car>(queryBuilder, options);
  }
}
