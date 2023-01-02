import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'postgres-db',
  port: +process.env.POSTGRES_PORT || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'car_db',
  entities: [__dirname + '/**/*.entity.ts', __dirname + '/**/*.entity.js'],
  migrationsRun: true,
  logging: true,
  migrationsTableName: 'migration',
  migrations: [
    __dirname + '/migration/**/*.ts',
    __dirname + '/migration/**/*.js',
  ],
  cli: {
    migrationsDir: 'src/migration',
  },
  synchronize: false,
};

export = typeOrmConfig;
