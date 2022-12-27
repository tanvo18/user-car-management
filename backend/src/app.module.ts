import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as typeOrmConfig from './typeorm.config';
import { UserModule } from './user/user.module';
import { CarModule } from './car/car.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UserModule, CarModule],
})
export class AppModule {}
