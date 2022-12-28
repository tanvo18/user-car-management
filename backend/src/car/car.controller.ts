import { Body, Controller, UseGuards, Post, Put, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CarService } from './service/car.service';
import { CarInfoDto } from './dto/car-info.dto';
import { Car } from './entity/car.entity';
import { GetUser } from 'src/user/decorator/get-user.decorator';
import { User } from 'src/user/entity/user.entity';
import { AvailabilityDto } from './dto/availability.dto';

@ApiTags('Car')
@ApiBearerAuth()
@Controller('cars')
@UseGuards(AuthGuard())
export class CarController {
  constructor(private carService: CarService) {}

  @Get()
  getCar(@GetUser() user: User): Promise<Car[]> {
    return this.carService.getCars(user.id);
  }

  @Post()
  addCar(@Body() car: CarInfoDto, @GetUser() user: User): Promise<Car> {
    return this.carService.addCar(car, user);
  }

  @Put()
  setAvailability(@Body() body: AvailabilityDto) {
    return this.carService.setAvailability(body);
  }
}
