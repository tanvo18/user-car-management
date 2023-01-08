import {
  Body,
  Controller,
  UseGuards,
  Post,
  Put,
  Get,
  HttpException,
  HttpStatus,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CarService } from './service/car.service';
import { CarInfoDto } from './dto/car-info.dto';
import { Car } from './entity/car.entity';
import { GetUser } from 'src/user/decorator/get-user.decorator';
import { User } from 'src/user/entity/user.entity';
import { setAvailabilityDto } from './dto/availability.dto';
import { Role } from 'src/enums/role';
import { Roles } from 'src/user/decorator/roles.decorator';
import { DeepPartial, InsertResult } from 'typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';

@ApiTags('Car')
@ApiBearerAuth()
@Controller('cars')
@UseGuards(AuthGuard())
export class CarController {
  constructor(private carService: CarService) { }

  @Get()
  @Roles([Role.ADMIN, Role.USER])
  async getCars(@GetUser() user: User): Promise<Car[]> {
    try {
      return await this.carService.getCars(user.id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('pagination')
  @Roles([Role.ADMIN, Role.USER])
  async getCarPagination(
    @GetUser() user: User,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit,
  ): Promise<Pagination<Car>> {
    try {
      limit = limit > 100 ? 100 : limit;

      return await this.carService.getCarsPagination(user.id, {
        page,
        limit,
        route: '/cars/pagination',
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post()
  async addCar(
    @Body() car: CarInfoDto,
    @GetUser() user: User,
  ): Promise<DeepPartial<Car>> {
    try {
      const result = await this.carService.addCar(car, user);
      const { username, name, email } = result.user;

      return {
        model: result.model,
        user: {
          username,
          name,
          email,
        },
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('/add-bulk')
  async addBulkCar(
    @Body() car: CarInfoDto,
    @GetUser() user: User,
  ): Promise<InsertResult> {
    try {
      return await this.carService.addBulkCar(car, user);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Put()
  async setAvailability(@Body() body: setAvailabilityDto): Promise<Car | null> {
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
