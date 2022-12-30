import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { CarStatus } from '../../availability/entity/availability.entity';
export class AvailabilityDto {
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @IsEnum(CarStatus)
  status: CarStatus;
}

export class setAvailabilityDto {
  @ApiProperty({
    required: false,
  })
  @IsNotEmpty()
  @IsNumber()
  carId: number;

  @ApiProperty({
    required: false,
  })
  @ValidateNested({ each: true })
  @Type(() => AvailabilityDto)
  availability: AvailabilityDto;
}
