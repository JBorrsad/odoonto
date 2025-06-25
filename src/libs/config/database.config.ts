import { get } from 'env-var';
import '../shared/utils/dotenv';

// https://github.com/Sairyss/backend-best-practices#configuration

export const databaseConfig = {
  type: 'postgres',
  host: get('GLOBAL_DB_HOST').required().asString(),
  port: get('GLOBAL_DB_PORT').required().asIntPositive(),
  username: get('GLOBAL_DB_USERNAME').required().asString(),
  password: get('GLOBAL_DB_PASSWORD').required().asString(),
  database: get('GLOBAL_DB_NAME').required().asString(),
};

export const postgresConnectionUri = `postgres://${databaseConfig.username}:${databaseConfig.password}@${databaseConfig.host}/${databaseConfig.database}`;
