"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletModule = void 0;
const common_1 = require("@nestjs/common");
const create_wallet_when_user_is_created_domain_event_handler_1 = require("./application/event-handlers/create-wallet-when-user-is-created.domain-event-handler");
const wallet_repository_1 = require("./database/wallet.repository");
const wallet_di_tokens_1 = require("./wallet.di-tokens");
const wallet_mapper_1 = require("./wallet.mapper");
const eventHandlers = [
    create_wallet_when_user_is_created_domain_event_handler_1.CreateWalletWhenUserIsCreatedDomainEventHandler,
];
const mappers = [wallet_mapper_1.WalletMapper];
const repositories = [
    { provide: wallet_di_tokens_1.WALLET_REPOSITORY, useClass: wallet_repository_1.WalletRepository },
];
let WalletModule = class WalletModule {
};
exports.WalletModule = WalletModule;
exports.WalletModule = WalletModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [],
        providers: [common_1.Logger, ...eventHandlers, ...mappers, ...repositories],
    })
], WalletModule);
//# sourceMappingURL=wallet.module.js.map