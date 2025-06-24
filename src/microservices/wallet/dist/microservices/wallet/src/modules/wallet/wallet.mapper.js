"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletMapper = void 0;
const common_1 = require("@nestjs/common");
const wallet_entity_1 = require("./domain/wallet.entity");
const wallet_repository_1 = require("./database/wallet.repository");
let WalletMapper = class WalletMapper {
    toPersistence(entity) {
        const copy = entity.getProps();
        const record = {
            id: copy.id,
            createdAt: copy.createdAt,
            updatedAt: copy.updatedAt,
            userId: copy.userId,
            balance: copy.balance,
        };
        return wallet_repository_1.walletSchema.parse(record);
    }
    toDomain(record) {
        const entity = new wallet_entity_1.WalletEntity({
            id: record.id,
            createdAt: record.createdAt,
            updatedAt: record.updatedAt,
            props: {
                userId: record.userId,
                balance: record.balance,
            },
        });
        return entity;
    }
    toResponse() {
        throw new Error('Not implemented');
    }
};
exports.WalletMapper = WalletMapper;
exports.WalletMapper = WalletMapper = __decorate([
    (0, common_1.Injectable)()
], WalletMapper);
//# sourceMappingURL=wallet.mapper.js.map