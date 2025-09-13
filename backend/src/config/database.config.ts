import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

// 用于 TypeORM CLI 的数据库配置
export const databaseConfig = new DataSource({
  type: 'better-sqlite3',
  database: './data/tasks.db',
  entities: [__dirname + '/../database/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: true,
});