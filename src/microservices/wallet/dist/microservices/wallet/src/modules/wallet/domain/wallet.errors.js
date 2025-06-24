"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletNotEnoughBalanceError = void 0;
const exceptions_1 = require("../../../../../../libs/shared/exceptions");
class WalletNotEnoughBalanceError extends exceptions_1.ExceptionBase {
    constructor(metadata) {
        super(WalletNotEnoughBalanceError.message, undefined, metadata);
        this.code = 'WALLET.NOT_ENOUGH_BALANCE';
    }
}
exports.WalletNotEnoughBalanceError = WalletNotEnoughBalanceError;
WalletNotEnoughBalanceError.message = 'Wallet has not enough balance';
//# sourceMappingURL=wallet.errors.js.map