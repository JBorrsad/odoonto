"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postgresConnectionUri = exports.databaseConfig = void 0;
const env_var_1 = require("env-var");
require("../shared/utils/dotenv");
exports.databaseConfig = {
    type: 'postgres',
    host: (0, env_var_1.get)('DB_HOST').required().asString(),
    port: (0, env_var_1.get)('DB_PORT').required().asIntPositive(),
    username: (0, env_var_1.get)('DB_USERNAME').required().asString(),
    password: (0, env_var_1.get)('DB_PASSWORD').required().asString(),
    database: (0, env_var_1.get)('DB_NAME').required().asString(),
};
exports.postgresConnectionUri = `postgres://${exports.databaseConfig.username}:${exports.databaseConfig.password}@${exports.databaseConfig.host}/${exports.databaseConfig.database}`;
//# sourceMappingURL=database.config.js.map