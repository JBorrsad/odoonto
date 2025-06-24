"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlRepositoryBase = void 0;
const AppRequestContext_1 = require("../application/context/AppRequestContext");
const ddd_1 = require("../ddd");
const exceptions_1 = require("../exceptions");
const oxide_ts_1 = require("oxide.ts");
const slonik_1 = require("slonik");
class SqlRepositoryBase {
    constructor(_pool, mapper, eventEmitter, logger) {
        this._pool = _pool;
        this.mapper = mapper;
        this.eventEmitter = eventEmitter;
        this.logger = logger;
    }
    async findOneById(id) {
        const query = slonik_1.sql.type(this.schema) `SELECT * FROM ${slonik_1.sql.identifier([
            this.tableName,
        ])} WHERE id = ${id}`;
        const result = await this.pool.query(query);
        return result.rows[0] ? (0, oxide_ts_1.Some)(this.mapper.toDomain(result.rows[0])) : oxide_ts_1.None;
    }
    async findAll() {
        const query = slonik_1.sql.type(this.schema) `SELECT * FROM ${slonik_1.sql.identifier([
            this.tableName,
        ])}`;
        const result = await this.pool.query(query);
        return result.rows.map(this.mapper.toDomain);
    }
    async findAllPaginated(params) {
        const query = slonik_1.sql.type(this.schema) `
    SELECT * FROM ${slonik_1.sql.identifier([this.tableName])}
    LIMIT ${params.limit}
    OFFSET ${params.offset}
    `;
        const result = await this.pool.query(query);
        const entities = result.rows.map(this.mapper.toDomain);
        return new ddd_1.Paginated({
            data: entities,
            count: result.rowCount,
            limit: params.limit,
            page: params.page,
        });
    }
    async delete(entity) {
        entity.validate();
        const query = (0, slonik_1.sql) `DELETE FROM ${slonik_1.sql.identifier([
            this.tableName,
        ])} WHERE id = ${entity.id}`;
        this.logger.debug(`[${AppRequestContext_1.RequestContextService.getRequestId()}] deleting entities ${entity.id} from ${this.tableName}`);
        const result = await this.pool.query(query);
        await entity.publishEvents(this.logger, this.eventEmitter);
        return result.rowCount > 0;
    }
    async insert(entity) {
        const entities = Array.isArray(entity) ? entity : [entity];
        const records = entities.map(this.mapper.toPersistence);
        const query = this.generateInsertQuery(records);
        try {
            await this.writeQuery(query, entities);
        }
        catch (error) {
            if (error instanceof slonik_1.UniqueIntegrityConstraintViolationError) {
                this.logger.debug(`[${AppRequestContext_1.RequestContextService.getRequestId()}] ${error.originalError.detail}`);
                throw new exceptions_1.ConflictException('Record already exists', error);
            }
            throw error;
        }
    }
    async writeQuery(sql, entity) {
        const entities = Array.isArray(entity) ? entity : [entity];
        entities.forEach((entity) => entity.validate());
        const entityIds = entities.map((e) => e.id);
        this.logger.debug(`[${AppRequestContext_1.RequestContextService.getRequestId()}] writing ${entities.length} entities to "${this.tableName}" table: ${entityIds}`);
        const result = await this.pool.query(sql);
        await Promise.all(entities.map((entity) => entity.publishEvents(this.logger, this.eventEmitter)));
        return result;
    }
    generateInsertQuery(models) {
        const entries = Object.entries(models[0]);
        const values = [];
        const propertyNames = [];
        entries.forEach((entry) => {
            if (entry[0] && entry[1] !== undefined) {
                propertyNames.push(slonik_1.sql.identifier([entry[0]]));
                if (entry[1] instanceof Date) {
                    values.push(slonik_1.sql.timestamp(entry[1]));
                }
                else {
                    values.push(entry[1]);
                }
            }
        });
        const query = (0, slonik_1.sql) `INSERT INTO ${slonik_1.sql.identifier([
            this.tableName,
        ])} (${slonik_1.sql.join(propertyNames, (0, slonik_1.sql) `, `)}) VALUES (${slonik_1.sql.join(values, (0, slonik_1.sql) `, `)})`;
        const parsedQuery = query;
        return parsedQuery;
    }
    async transaction(handler) {
        return this.pool.transaction(async (connection) => {
            this.logger.debug(`[${AppRequestContext_1.RequestContextService.getRequestId()}] transaction started`);
            if (!AppRequestContext_1.RequestContextService.getTransactionConnection()) {
                AppRequestContext_1.RequestContextService.setTransactionConnection(connection);
            }
            try {
                const result = await handler();
                this.logger.debug(`[${AppRequestContext_1.RequestContextService.getRequestId()}] transaction committed`);
                return result;
            }
            catch (e) {
                this.logger.debug(`[${AppRequestContext_1.RequestContextService.getRequestId()}] transaction aborted`);
                throw e;
            }
            finally {
                AppRequestContext_1.RequestContextService.cleanTransactionConnection();
            }
        });
    }
    get pool() {
        return (AppRequestContext_1.RequestContextService.getContext().transactionConnection ?? this._pool);
    }
}
exports.SqlRepositoryBase = SqlRepositoryBase;
//# sourceMappingURL=sql-repository.base.js.map