import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarRepository } from '../repository/car.repository';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(CarRepository)
    private carRepository: CarRepository,
  ) {}

  async addCar() {
    this.carRepository.addCar();
  }
}
