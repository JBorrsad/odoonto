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
var UserRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = exports.userSchema = void 0;
const nestjs_slonik_1 = require("nestjs-slonik");
const slonik_1 = require("slonik");
const zod_1 = require("zod");
const user_mapper_1 = require("../user.mapper");
const user_types_1 = require("../domain/user.types");
const sql_repository_base_1 = require("../../../../../../libs/shared/db/sql-repository.base");
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
exports.userSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    createdAt: zod_1.z.preprocess((val) => new Date(val), zod_1.z.date()),
    updatedAt: zod_1.z.preprocess((val) => new Date(val), zod_1.z.date()),
    email: zod_1.z.string().email(),
    country: zod_1.z.string().min(1).max(255),
    postalCode: zod_1.z.string().min(1).max(20),
    street: zod_1.z.string().min(1).max(255),
    role: zod_1.z.nativeEnum(user_types_1.UserRoles),
});
let UserRepository = UserRepository_1 = class UserRepository extends sql_repository_base_1.SqlRepositoryBase {
    constructor(pool, mapper, eventEmitter) {
        super(pool, mapper, eventEmitter, new common_1.Logger(UserRepository_1.name));
        this.tableName = 'users';
        this.schema = exports.userSchema;
    }
    async updateAddress(user) {
        const address = user.getProps().address;
        const statement = slonik_1.sql.type(exports.userSchema) `
    UPDATE "users" SET
    street = ${address.street}, country = ${address.country}, "postalCode" = ${address.postalCode}
    WHERE id = ${user.id}`;
        await this.writeQuery(statement, user);
    }
    async findOneByEmail(email) {
        const user = await this.pool.one(slonik_1.sql.type(exports.userSchema) `SELECT * FROM "users" WHERE email = ${email}`);
        return this.mapper.toDomain(user);
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = UserRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_slonik_1.InjectPool)()),
    __metadata("design:paramtypes", [Object, user_mapper_1.UserMapper,
        event_emitter_1.EventEmitter2])
], UserRepository);
//# sourceMappingURL=user.repository.js.map