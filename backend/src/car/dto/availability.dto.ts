import { ApiProperty } from '@nestjs/swagger';
import { Availability } from 'src/availability/entity/availability.entity';

export class AvailabilityDto {
  @ApiProperty({
    required: false,
  })
  id: number;

  @ApiProperty({
    required: false,
  })
  availability: Availability;
}
