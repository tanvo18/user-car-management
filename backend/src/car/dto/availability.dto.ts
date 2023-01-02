import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { CarStatus } from '../../availability/entity/availability.entity';
export class AvailabilityDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  date: Date;

  @ApiProperty({
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(CarStatus)
  status: CarStatus;
}

export class setAvailabilityDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  carId: number;

  @ApiProperty({
    required: true,
  })
  @ValidateNested({ each: true })
  @Type(() => AvailabilityDto)
  availability: AvailabilityDto;
}
