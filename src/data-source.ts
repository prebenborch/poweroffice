import 'reflect-metadata';
import {DataSource} from 'typeorm';
import {User} from './entity/User';
import {Token} from './entity/Token';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'chanchal',
  password: 'xxxxxx',
  database: 'demo',
  synchronize: true,
  logging: false,
  entities: [User,Token],
  migrations: [],
  subscribers: [],
});

const AppDataSource2 = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'chanchal',
  password: 'xxxxxx',
  database: 'dsource1',
  synchronize: true,
  logging: false,
  entities: [User,Token],
  migrations: [],
  subscribers: [],
});

export {AppDataSource, AppDataSource2};
