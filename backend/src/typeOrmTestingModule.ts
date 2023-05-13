import { TypeOrmModule } from '@nestjs/typeorm';
import * as typeOrmConfig from './typeorm.config';

export const TypeOrmTestingModule = (entities: any[]) =>
  TypeOrmModule.forRoot({
    ...typeOrmConfig,
    entities: [...entities],
  });
