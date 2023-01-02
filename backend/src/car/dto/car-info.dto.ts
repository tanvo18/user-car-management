import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CarInfoDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  model: string;
}
