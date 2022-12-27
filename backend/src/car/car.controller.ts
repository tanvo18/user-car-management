import { Post, Body, ValidationPipe, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CarService } from './service/car.service';
@ApiTags('Car')
@Controller('cars')
export class CarController {
  constructor(private carService: CarService) {}

  @Post()
  addCar() {
    this.carService.addCar();
  }
}
