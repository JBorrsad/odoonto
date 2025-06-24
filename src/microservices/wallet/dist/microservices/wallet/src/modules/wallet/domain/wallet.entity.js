"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletEntity = void 0;
const ddd_1 = require("../../../../../../libs/shared/ddd");
const exceptions_1 = require("../../../../../../libs/shared/exceptions");
const oxide_ts_1 = require("oxide.ts");
const wallet_created_domain_event_1 = require("./events/wallet-created.domain-event");
const wallet_errors_1 = require("./wallet.errors");
const crypto_1 = require("crypto");
class WalletEntity extends ddd_1.AggregateRoot {
    static create(create) {
        const id = (0, crypto_1.randomUUID)();
        const props = { ...create, balance: 0 };
        const wallet = new WalletEntity({ id, props });
        wallet.addEvent(new wallet_created_domain_event_1.WalletCreatedDomainEvent({ aggregateId: id, userId: create.userId }));
        return wallet;
    }
    deposit(amount) {
        this.props.balance += amount;
    }
    withdraw(amount) {
        if (this.props.balance - amount < 0) {
            return (0, oxide_ts_1.Err)(new wallet_errors_1.WalletNotEnoughBalanceError());
        }
        this.props.balance -= amount;
        return (0, oxide_ts_1.Ok)(null);
    }
    validate() {
        if (this.props.balance < 0) {
            throw new exceptions_1.ArgumentOutOfRangeException('Wallet balance cannot be less than 0');
        }
    }
}
exports.WalletEntity = WalletEntity;
//# sourceMappingURL=wallet.entity.js.map