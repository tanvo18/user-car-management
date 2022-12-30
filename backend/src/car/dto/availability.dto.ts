import { ApiProperty } from '@nestjs/swagger';
import { Availability } from 'src/availability/entity/availability.entity';
import { IsNotEmpty } from 'class-validator';

export class AvailabilityDto {
  @ApiProperty({
    required: false,
  })
  @IsNotEmpty()
  carId: number;

  @ApiProperty({
    required: false,
  })
  @IsNotEmpty()
  availability: Availability;
}
