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
exports.CreateWalletWhenUserIsCreatedDomainEventHandler = void 0;
const user_created_domain_event_1 = require("../../../../../../../libs/shared/events/user-created.domain-event");
const wallet_entity_1 = require("../../domain/wallet.entity");
const event_emitter_1 = require("@nestjs/event-emitter");
const common_1 = require("@nestjs/common");
const wallet_di_tokens_1 = require("../../wallet.di-tokens");
let CreateWalletWhenUserIsCreatedDomainEventHandler = class CreateWalletWhenUserIsCreatedDomainEventHandler {
    constructor(walletRepo) {
        this.walletRepo = walletRepo;
    }
    async handle(event) {
        const wallet = wallet_entity_1.WalletEntity.create({
            userId: event.aggregateId,
        });
        return this.walletRepo.insert(wallet);
    }
};
exports.CreateWalletWhenUserIsCreatedDomainEventHandler = CreateWalletWhenUserIsCreatedDomainEventHandler;
__decorate([
    (0, event_emitter_1.OnEvent)(user_created_domain_event_1.UserCreatedDomainEvent.name, { async: true, promisify: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_created_domain_event_1.UserCreatedDomainEvent]),
    __metadata("design:returntype", Promise)
], CreateWalletWhenUserIsCreatedDomainEventHandler.prototype, "handle", null);
exports.CreateWalletWhenUserIsCreatedDomainEventHandler = CreateWalletWhenUserIsCreatedDomainEventHandler = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(wallet_di_tokens_1.WALLET_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], CreateWalletWhenUserIsCreatedDomainEventHandler);
//# sourceMappingURL=create-wallet-when-user-is-created.domain-event-handler.js.map