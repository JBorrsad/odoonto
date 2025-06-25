import { get } from 'env-var';
import '../shared/utils/dotenv';

// https://github.com/Sairyss/backend-best-practices#configuration

export const databaseConfig = {
  type: 'postgres',
  host: get('USER_DB_HOST').default('localhost').asString(),
  port: get('USER_DB_PORT').default(5432).asIntPositive(),
  username: get('USER_DB_USERNAME').default('postgres').asString(),
  password: get('USER_DB_PASSWORD').default('postgres123').asString(),
  database: get('USER_DB_NAME').default('odoonto').asString(),
};

export const postgresConnectionUri = `postgres://${databaseConfig.username}:${databaseConfig.password}@${databaseConfig.host}:${databaseConfig.port}/${databaseConfig.database}`;
