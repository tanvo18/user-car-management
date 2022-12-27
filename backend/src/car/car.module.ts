import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarService } from './service/car.service';
import { CarController } from './car.controller';
import { CarRepository } from './repository/car.repository';
@Module({
  imports: [TypeOrmModule.forFeature([CarRepository])],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
