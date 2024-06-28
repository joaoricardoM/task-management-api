import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

const configService = new ConfigService();

console.log('DB_HOST:', configService.get<string>('DB_HOST'));
console.log('DB_PORT:', configService.get<number>('DB_PORT'));
console.log('DB_USERNAME:', configService.get<string>('DB_USERNAME'));
console.log('DB_PASSWORD:', configService.get<string>('DB_PASSWORD'));
console.log('DB_NAME:', configService.get<string>('DB_NAME'));

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: +configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [],
  migrations: [__dirname + '/migrations/*.ts'],
  synchronize: false,
};

export default new DataSource(dataSourceOptions);
