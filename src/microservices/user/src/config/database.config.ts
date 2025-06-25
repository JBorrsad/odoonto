import { get } from 'env-var';
import '../shared/utils/dotenv';

// https://github.com/Sairyss/backend-best-practices#configuration

export const databaseConfig = {
  type: 'postgres',
  host: get('DATABASE_HOST').default('localhost').asString(),
  port: get('DATABASE_PORT').default(5432).asIntPositive(),
  username: get('DATABASE_USER').default('postgres').asString(),
  password: get('DATABASE_PASSWORD').default('postgres123').asString(),
  database: get('DATABASE_NAME').default('odoonto').asString(),
};

export const postgresConnectionUri = `postgres://${databaseConfig.username}:${databaseConfig.password}@${databaseConfig.host}:${databaseConfig.port}/${databaseConfig.database}`;
