import { AvailabilityDto } from '../car/dto/availability.dto';
import { Availability } from '../availability/entity/availability.entity';
import { classToPlain, plainToClass } from 'class-transformer';

export const toEntity = (availabilityDto: AvailabilityDto): Availability => {
  const data = classToPlain(availabilityDto);
  return plainToClass(Availability, data);
};
