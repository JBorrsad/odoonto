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
var WalletRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletRepository = exports.walletSchema = void 0;
const nestjs_slonik_1 = require("nestjs-slonik");
const zod_1 = require("zod");
const sql_repository_base_1 = require("../../../../../../libs/shared/db/sql-repository.base");
const wallet_mapper_1 = require("../wallet.mapper");
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
exports.walletSchema = zod_1.z.object({
    id: zod_1.z.string().min(1).max(255),
    createdAt: zod_1.z.preprocess((val) => new Date(val), zod_1.z.date()),
    updatedAt: zod_1.z.preprocess((val) => new Date(val), zod_1.z.date()),
    balance: zod_1.z.number().min(0).max(9999999),
    userId: zod_1.z.string().min(1).max(255),
});
let WalletRepository = WalletRepository_1 = class WalletRepository extends sql_repository_base_1.SqlRepositoryBase {
    constructor(pool, mapper, eventEmitter) {
        super(pool, mapper, eventEmitter, new common_1.Logger(WalletRepository_1.name));
        this.tableName = 'wallets';
        this.schema = exports.walletSchema;
    }
};
exports.WalletRepository = WalletRepository;
exports.WalletRepository = WalletRepository = WalletRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_slonik_1.InjectPool)()),
    __metadata("design:paramtypes", [Object, wallet_mapper_1.WalletMapper,
        event_emitter_1.EventEmitter2])
], WalletRepository);
//# sourceMappingURL=wallet.repository.js.map