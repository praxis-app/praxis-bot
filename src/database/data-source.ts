import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { PraxisInstanceConfig } from './entities/PraxisInstanceConfig';

dotenv.config();

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  database: process.env.DB_SCHEMA,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT as string),
  synchronize: process.env.NODE_ENV === 'development',
  entities: [PraxisInstanceConfig],
  migrations: [],
});
