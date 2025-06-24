"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindUsersQueryHandler = exports.FindUsersQuery = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const oxide_ts_1 = require("oxide.ts");
const query_base_1 = require("../../../../../../../libs/shared/ddd/query.base");
const ddd_1 = require("../../../../../../../libs/shared/ddd");
const nestjs_slonik_1 = require("nestjs-slonik");
const slonik_1 = require("slonik");
const user_repository_1 = require("../../database/user.repository");
class FindUsersQuery extends query_base_1.PaginatedQueryBase {
    constructor(props) {
        super(props);
        this.country = props.country;
        this.postalCode = props.postalCode;
        this.street = props.street;
    }
}
exports.FindUsersQuery = FindUsersQuery;
let FindUsersQueryHandler = class FindUsersQueryHandler {
    constructor(pool) {
        this.pool = pool;
    }
    async execute(query) {
        const statement = slonik_1.sql.type(user_repository_1.userSchema) `
         SELECT *
         FROM users
         WHERE
           ${query.country ? (0, slonik_1.sql) `country = ${query.country}` : true} AND
           ${query.street ? (0, slonik_1.sql) `street = ${query.street}` : true} AND
           ${query.postalCode ? (0, slonik_1.sql) `"postalCode" = ${query.postalCode}` : true}
         LIMIT ${query.limit}
         OFFSET ${query.offset}`;
        const records = await this.pool.query(statement);
        return (0, oxide_ts_1.Ok)(new ddd_1.Paginated({
            data: records.rows,
            count: records.rowCount,
            limit: query.limit,
            page: query.page,
        }));
    }
};
exports.FindUsersQueryHandler = FindUsersQueryHandler;
exports.FindUsersQueryHandler = FindUsersQueryHandler = __decorate([
    (0, cqrs_1.QueryHandler)(FindUsersQuery),
    __param(0, (0, nestjs_slonik_1.InjectPool)()),
    __metadata("design:paramtypes", [Object])
], FindUsersQueryHandler);
//# sourceMappingURL=find-users.query-handler.js.map