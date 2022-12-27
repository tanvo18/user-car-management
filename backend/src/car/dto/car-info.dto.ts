import { ApiProperty } from '@nestjs/swagger';

export class CarInfoDto {
  @ApiProperty({
    required: false,
  })
  model: string;
}
