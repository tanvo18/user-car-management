import {
  Body,
  Controller,
  UseGuards,
  Post,
  Put,
  Get,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
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
  constructor(private carService: CarService) { }

  @Get()
  async getCar(@GetUser() user: User): Promise<Car[]> {
    return await this.carService.getCars(user.id);
  }

  @Post()
  async addCar(@Body() car: CarInfoDto, @GetUser() user: User): Promise<Car> {
    const result = await this.carService.addCar(car, user);

    return result;
  }

  @Put()
  async setAvailability(@Body() body: AvailabilityDto): Promise<Car | null> {
    try {
      const result = await this.carService.setAvailability(body);
      if (!result) {
        throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
      }

      return result;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
